from django.db.models.signals import pre_save
from kafka import KafkaProducer
import json

def TransactionProducer(account_number, transaction_id, transaction_type, amount):
    producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
    topic = 'bank_transactions'
    message = {
        'account_number': account_number,
        'transaction_id': transaction_id,
        'transaction_type': transaction_type,
        'amount':amount
    }
    
    producer.send(topic, value=json.dumps(message).encode('utf-8'))
    producer.flush()