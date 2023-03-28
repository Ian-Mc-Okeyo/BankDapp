from django.db import models

class Loan(models.Model):
    account_number = models.CharField(max_length=200)
    loans_balance = models.FloatField()
