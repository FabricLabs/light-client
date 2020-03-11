#!/usr/bin/env bash

export CHAIN_ID=4321
export PFS_SERVICE_FEE=100
export PFS_PASSWORD=1234
export LOG_LEVEL=INFO
export WORKER_COUNT=1
export SERVER_NAME=localhost
export ETH_RPC="http://localhost:8545"

source /opt/deployment/user_deposit_info.sh

/opt/services/venv/bin/python -m pathfinding_service.cli \
    --enable-debug \
    --log-json \
    --keystore-file /opt/services/keystore/UTC--2020-03-11T15-39-16.935381228Z--2b5e1928c25c5a326dbb61fc9713876dd2904e34 \
    --token-network-registry-address $TOKEN_NETWORK_REGISTRY_ADDRESS \
    --user-deposit-contract-address $USER_DEPOSIT_ADDRESS
