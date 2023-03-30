from rest_framework import serializers
from .models import Account, Transaction

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["account_number", "id_number", "balance"]
        

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["Transaction_id", "transaction_type", "amount"]

class TransferSerializer(serializers.Serializer):
    sender_account_number = serializers.CharField()
    receiver_account_number = serializers.CharField()
    transfer_hash = serializers.CharField()
    amount = serializers.IntegerField()

    def validate_sender_account_number(self, sender_account_number):
        account = Account.objects.filter(account_number = sender_account_number).first()
        if not account:
            raise serializers.ValidationError({"Error": "Invalid sender account Number"})
        return sender_account_number

    def validate_receiver_account_number(self, receiver_account_number):
        account = Account.objects.filter(account_number = receiver_account_number).first()
        if not account:
            raise serializers.ValidationError({"Error": "Invalid receiver account Number"})
        return receiver_account_number

    def validate_amount(self, amount):
        if not amount or float(amount) <=0:
            raise serializers.ValidationError({"Error": "Amount is not valid"})
        
        return amount

    def transfer(self, validated_data):
        senderAccount = Account.objects.filter(account_number = validated_data['sender_account_number']).first()
        receiverAccount = Account.objects.filter(account_number = validated_data['receiver_account_number']).first()
        amount = validated_data['amount']
        senderAccount.balance -= int(amount)
        senderAccount.average_txn = (senderAccount.average_txn + float(validated_data['amount']))/2

        receiverAccount.balance += int(amount)
        receiverAccount.average_txn = (receiverAccount.average_txn + float(validated_data['amount']))/2

        senderTxn = Transaction(account = senderAccount, transaction_id = validated_data['transfer_hash'], transaction_type = 'transfer_send', amount=validated_data['amount'])
        receiverTxn = Transaction(account = receiverAccount, transaction_id = validated_data['transfer_hash'], transaction_type = 'transfer_receive', amount=validated_data['amount'])
        senderAccount.save()
        receiverAccount.save()

        senderTxn.save()
        receiverTxn.save()

class DepositSerializer(serializers.Serializer):
    account_number = serializers.CharField()
    amount = serializers.CharField()
    deposit_hash = serializers.CharField()

    def validate_account_number(self, account_number):
        account = Account.objects.filter(account_number = account_number).first()
        if not account:
            raise serializers.ValidationError({"Error": "Invalid Account Number"})
        return account_number

    def validate_amount(self, amount):
        if not amount or float(amount) <= 0:
            raise serializers.ValidationError({"Error": "Amount is not valid"})
        
        return amount

    def deposit(self, validated_data):#
        print(validated_data['account_number'])
        account = Account.objects.filter(account_number = validated_data['account_number']).first()
        account.balance += int(validated_data['amount'])
        account.average_txn = (account.average_txn + int(validated_data['amount']))/2
        newTxn = Transaction(account = account, transaction_id = validated_data['deposit_hash'], transaction_type = 'deposit', amount=validated_data['amount'])
        account.save()
        newTxn.save()

class WithdrawSerializer(serializers.Serializer):
    account_number = serializers.CharField()
    amount = serializers.CharField()
    withdraw_hash = serializers.CharField()

    def validate_account_number(self, account_number):
        account = Account.objects.filter(account_number = account_number).first()
        if not account:
            raise serializers.ValidationError({"Error": "Invalid Account Number"})
        return account_number

    def validate_amount(self, amount):
        if not amount or float(amount) <= 0:
            raise serializers.ValidationError({"Error": "Amount is not valid"})
        
        return amount

    def withdraw(self, validated_data):
        account = Account.objects.filter(account_number = validated_data['account_number']).first()
        account.balance -= int(validated_data['amount'])
        account.average_txn = (account.average_txn + int(validated_data['amount']))/2
        newTxn = Transaction(account = account, transaction_id = validated_data['withdraw_hash'], transaction_type = 'withdraw', amount=validated_data['amount'])
        account.save()
        newTxn.save()
