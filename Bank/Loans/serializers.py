from rest_framework import serializers
from .models import Loan
from Accounts.models import Account

class LoanSerializer(serializers.Serializer):
    account_number = serializers.CharField()

    def validate_account_number(self, account_number):
        account = Account.objects.filter(account_number=account_number).first()
        loanAccount = Loan.objects.filter(account = account).first()
        if not account:
            raise serializers.ValidationError({"Error": "Account number does not exist"})
        if loanAccount:
            raise serializers.ValidationError({"Error": "Loan Account already exist"})
        return account_number
    
    def create(self, validated_data):
        account = Account.objects.filter(account_number=validated_data['account_number']).first()
        newLoanAccount = Loan(account=account, loan_balance=0)
        newLoanAccount.save()

class BorrowSerializer(serializers.Serializer):
    account_number = serializers.CharField()
    amount = serializers.FloatField()

    def validate_account_number(self, account_number):
        account = Account.objects.filter(account_number = account_number).first()
        loanAccount = Loan.objects.filter(account=account).first()
        if not loanAccount:
            raise serializers.ValidationError({"Error": "Loan account does not exist"})
        return account_number
    
    def validate_amount(self, amount):
        account = Account.objects.filter(account_number = self.account_number).first()
        loanAccount = Loan.objects.filter(account=account).first()
        if loanAccount.loans_balance > 0:
            raise serializers.ValidationError({"Error": "You have an outstanding loan balance"})
        if float(amount) < 0:
            raise serializers.ValidationError({"Error": "Invalid amount"})
        if float(amount) > account.average_txn:
            raise serializers.ValidationError({"Error": "Excessive borrowing"})
        
        return amount
    
    def borrow(self, validated_data):
        account = Account.objects.filter(account_number = validated_data['account_number']).first()
        loan_account = Loan.objects.filter(account = account).first()
        if loan_account:
            loan_account.loan_balance += float(validated_data['amount'])
            account.balance += float(validated_data['amount'])
            loan_account.save()
            account.save()

class RepaySerializer(serializers.Serializer):
    account_number = serializers.CharField()
    amount = serializers.FloatField()

    def validate_account_number(self, account_number):
        account = Account.objects.filter(account_number = self.account_number).first()
        account = Loan.objects.filter(account = account).first()
        if not account:
            raise serializers.ValidationError({"Error": "Loan account number does not exist"})
        return account_number
    
    def validate_amount(self, amount):
        account = Account.objects.filter(account_number = self.account_number).first()
        loan_account = Loan.objects.filter(account = account).first()
        if loan_account.loans_balance < float(amount):
            raise serializers.ValidationError({"Error": "Over payment"})
        if amount < 0:
            raise serializers.ValidationError({"Error": "Invalid amount"})
        if account.balance < amount:
            raise serializers.ValidationError({"Error": "Insufficient funds"})
        
        return amount
    
    def repay(self, validated_data):
        account = Account.objects.filter(account_number = validated_data['account_number']).first()
        loan_account = Loan.objects.filter(account = account).first()
        if loan_account:
            loan_account.loan_balance -= float(validated_data['amount'])
            account.balance -= float(validated_data['amount'])
            loan_account.save()
            account.save()

