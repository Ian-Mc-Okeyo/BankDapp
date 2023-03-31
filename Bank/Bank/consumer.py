from kafka import KafkaConsumer
from brownie import network, Contract
from abi import Accounts_abi
import json

network.connect('development')

contract_address = "0xc5a5C42992dECbae36851359345FE25997F5C42d"

contract = Contract.from_abi("Accounts", contract_address, Accounts_abi)


consumer = KafkaConsumer(
    'bank_transactions',
    bootstrap_servers=['localhost:9092'],
    group_id='my-group',
)

for message in consumer:
    print(json.loads(message.value)['transaction_id'])
    is_valid = contract.checkTransaction(json.loads(message.value)['account_number'], json.loads(message.value)['transaction_id'])
    print(is_valid)