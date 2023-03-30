from django.db import models
from Accounts.models import Account

class Loan(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    loan_balance = models.FloatField()
