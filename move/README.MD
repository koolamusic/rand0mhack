# Aptogotchi

## Publish Modules

```shell
./sh_scripts/move_publish.sh
```

## Run unit tests

```shell
./sh_scripts/move_test.sh
```

## Run move scripts

We cannot run move script to create aptogotchi, cause we set entry function in the module to be private to prevent test and abort attack.

```
package size 7771 bytes
{
  "Result": {
    "transaction_hash": "0x8b02eac06a06bfb0df936d33977e31eb263f0d0d451cf116d8019a388297e099",
    "gas_used": 7430,
    "gas_unit_price": 100,
    "sender": "35a3e49aa759f2e9ea60b37baabe1e791bbb1d07c41d16c3ac27675df87577b9",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1711031714019357,
    "version": 28006073,
    "vm_status": "Executed successfully"
  }
}
```
