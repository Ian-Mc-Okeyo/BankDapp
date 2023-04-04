from kafka import KafkaConsumer
from brownie import network, Contract
from django.core.mail import send_mail
from abi import Accounts_abi
import json
from django.conf import settings
settings.configure()

network.connect('development')

contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

contract = Contract.from_abi("Accounts", contract_address, Accounts_abi)


consumer = KafkaConsumer(
    'bank_transactions',
    bootstrap_servers=['localhost:9092'],
    group_id='my-group',
)

for message in consumer:
    print(json.loads(message.value)['transaction_id'])
    try:
        is_valid = contract.checkTransaction(json.loads(message.value)['account_number'], json.loads(message.value)['transaction_id'])
        print(is_valid)
    except:
                msg = 'Seems like an unauthorized transaction is about to be made.' 
                send_mail(
                    subject='Bank fraud Detection',
                    message=msg,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=['ianmarkokeyo@gmail.com']
                )