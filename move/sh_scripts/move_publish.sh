#!/bin/sh

set -e

echo "##### Publishing module #####"

# Profile is the account you used to execute transaction
# Run "aptos init" to create the profile, then get the profile name from .aptos/config.yaml
PROFILE=randomnet_profile

# ADDR=0x$(aptos config show-profiles --profile=$PROFILE | grep 'account' | sed -n 's/.*"account": \"\(.*\)\".*/\1/p')
ADDR=0x35a3e49aa759f2e9ea60b37baabe1e791bbb1d07c41d16c3ac27675df87577b9

# You need to checkout to randomnet branch in aptos-core and build the aptos cli manually
# This is a temporary solution until we have a stable release randomnet cli
# ~/go/src/github.com/aptos-labs/aptos-core/target/debug/aptos move publish \
aptos move publish \
--assume-yes \
--profile $PROFILE \
--named-addresses randblock=$ADDR
