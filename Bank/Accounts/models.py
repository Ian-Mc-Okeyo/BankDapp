from django.db import models

class Account(models.Model):
    account_number = models.CharField(max_length=200)
    id_number = models.CharField(max_length=200)
    balance = models.IntegerField()

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=250)
    transaction_type = models.CharField(max_length = 200)
    amount = models.CharField(max_length = 200)
