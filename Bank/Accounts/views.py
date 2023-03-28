from django.shortcuts import render
from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer, DepositSerializer, WithdrawSerializer, TransferSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes

class Register(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AccountSerializer(data = request.data)
        print(request.data)
        if serializer.is_valid():
            account = serializer.save()
            return Response({
                "user": AccountSerializer(account).data
            }, status=201)
        print(serializer.errors)
        return Response({"Status": "Error"}, status=500)

class Deposit(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = DepositSerializer(data = request.data)
        if serializer.is_valid():
            serializer.deposit(serializer.validated_data)
            return Response(serializer.data, status=201)
        
        print(serializer.errors)
        return Response({"Status": "Error"}, status=500)

class Transfer(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = TransferSerializer(data = request.data)
        if serializer.is_valid():
            serializer.transfer(serializer.validated_data)
            print(serializer.data)
            return Response(serializer.data, status=201)
        
        print(serializer.errors)
        return Response({"Status": "Error"}, status=500)

class Withdraw(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = WithdrawSerializer(data = request.data)
        if serializer.is_valid():
            serializer.withdraw(serializer.validated_data)
            print(serializer.data)
            return Response(serializer.data, status=201)
        
        print(serializer.errors)
        return Response({"Status": "Error"}, status=500)


