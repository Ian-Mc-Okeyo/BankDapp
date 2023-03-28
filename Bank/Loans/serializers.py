from rest_framework import serializers
from .models import Loan
from Accounts.models import Account

class loanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['account_number', 'loan_balance']

class BorrowSerializer(serializers.Serializer):
    account_number = serializers.CharField()
    amount = serializers.FloatField()

    def validate_account_number(self, account_number):
        account = Loan.objects.filter(account_number=account_number).first()
        if not account:
            raise serializers.ValidationError({"Error": "Loan account number does not exist"})
        return account_number
    
    def validate_amount(self, amount):
        account = Loan.objects.filter(account_number=self.account_number).first()
        if account.loans_balance > 0:
            raise serializers.ValidationError({"Error": "You have an outstanding loan balance"})
        if amount < 0:
            raise serializers.ValidationError({"Error": "Invalid amount"})
        
        return amount
    
    def borror(self, validated_data):
        loan_account = Loan.objects.filter(account_number = validated_data['account_number']).first()
        if loan_account:
            loan_account.loans_balance += float(validated_data['amount'])
            loan_account.save()

