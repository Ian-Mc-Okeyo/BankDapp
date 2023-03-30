from django.db.models.signals import pre_save
from kafka import KafkaProducer
from django.dispatch import receiver
from Accounts.models import Account

@receiver(pre_save, sender=Account)
def send_to_kafka(sender, instance, **kwargs):
    print("Consuming")
    producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
    topic = 'database_changes'
    message = {
        'model': sender.__name__,
        'id': instance.id,
        'action': 'created',
    }
    
    producer.send(topic, value=message)
    producer.flush()