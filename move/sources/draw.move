module raffle::raffle {
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    use aptos_framework::coin::Coin;
    use aptos_framework::event::EventHandle;
    use aptos_framework::randomness;
    use aptos_framework::vector::Vector;
    use aptos_std::smart_vector;
    use aptos_std::smart_vector::SmartVector;
    use std::signer;

    friend raffle::raffle_test;

    const E_NO_TICKETS: u64 = 2;
    const E_RAFFLE_HAS_CLOSED: u64 = 3;
    const TICKET_PRICE: u64 = 10_000;

    struct Raffle has key {
        tickets: SmartVector<address>,
        coins: Coin<AptosCoin>,
        is_closed: bool,
    }

    struct RaffleConfiguration has key {
        raffles: Vector<Raffle>,
        raffle_event: EventHandle<RaffleEvent>,
    }

    struct RaffleEvent has drop, store {
        raffle_index: u64,
        action: vector<u8>, // e.g., "created", "ticket_purchased", "winner_drawn"
        participant: Option<address>,
    }

    public fun init_module(deployer: &signer) {
        let raffle_event = EventHandle::new();
        let raffles = Vector::empty();
        move_to(deployer, RaffleConfiguration { raffles, raffle_event });
    }

    #[test_only]
    public(friend) fun init_module_for_testing(deployer: &signer) {
        init_module(deployer)
    }

    public fun get_ticket_price(): u64 { TICKET_PRICE }

    public entry fun buy_a_ticket(user: &signer, raffle_index: u64) acquires RaffleConfiguration {
        let raffle_configuration = borrow_global_mut<RaffleConfiguration>(@raffle);
        let raffle = Vector::borrow_mut(&mut raffle_configuration.raffles, raffle_index);

        let coins = coin::withdraw<AptosCoin>(user, TICKET_PRICE);
        coin::merge(&mut raffle.coins, coins);

        smart_vector::push_back(&mut raffle.tickets, signer::address_of(user));
        emit_raffle_event(&mut raffle_configuration.raffle_event, raffle_index, b"ticket_purchased", Some(signer::address_of(user)));
    }

    entry fun randomly_pick_winner(raffle_index: u64) acquires RaffleConfiguration {
        let raffle_configuration = borrow_global_mut<RaffleConfiguration>(@raffle);
        assert(!Vector::is_empty(&raffle_configuration.raffles), E_NO_TICKETS);

        let raffle = Vector::borrow_mut(&mut raffle_configuration.raffles, raffle_index);
        assert!(!raffle.is_closed, E_RAFFLE_HAS_CLOSED);

        let winner_idx = randomness::u64_range(0, smart_vector::length(&raffle.tickets));
        let winner = *smart_vector::borrow(&raffle.tickets, winner_idx);

        let coins = coin::extract_all(&mut raffle.coins);
        coin::deposit<AptosCoin>(winner, coins);
        raffle.is_closed = true;

        emit_raffle_event(&mut raffle_configuration.raffle_event, raffle_index, b"winner_drawn", Some(winner));
    }

    public fun create_new_raffle(owner: &signer) acquires RaffleConfiguration {
        let raffle_configuration = borrow_global_mut<RaffleConfiguration>(@raffle);
        let new_raffle = Raffle {
            tickets: smart_vector::empty(),
            coins: coin::zero(),
            is_closed: false,
        };
        let index = Vector::length(&raffle_configuration.raffles);
        Vector::push_back(&mut raffle_configuration.raffles, new_raffle);
        emit_raffle_event(&mut raffle_configuration.raffle_event, index, b"created", None);
    }

    fun emit_raffle_event(event_handle: &mut EventHandle<RaffleEvent>, index: u64, action: vector<u8>, participant: Option<address>) {
        let event = RaffleEvent {
            raffle_index: index,
            action: action,
            participant: participant,
        };
        EventHandle::emit(event_handle, event);
    }
}
