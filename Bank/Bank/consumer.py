from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'database_changes',
    bootstrap_servers=['localhost:9092'],
    group_id='my-group',
)

for message in consumer:
    print(message.value)