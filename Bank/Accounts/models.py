from django.db import models

class Account(models.Model):
    account_number = models.CharField(max_length=200, unique=True)
    id_number = models.CharField(max_length=200, unique=True)
    balance = models.IntegerField(default=0)
    average_txn = models.FloatField(default=0)

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=250, unique=True)
    transaction_type = models.CharField(max_length = 200)
    amount = models.CharField(max_length = 200)

