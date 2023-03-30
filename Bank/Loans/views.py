from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, authentication_classes
from .serializers import LoanSerializer, BorrowSerializer, RepaySerializer
from django.views.decorators.csrf import csrf_exempt

class CreateLoanAccount(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoanSerializer(data = request.data)
        if serializer.is_valid():
            account = serializer.create(serializer.validated_data)
            return Response({
                "account": account
            }, status= 201)
        print(serializer.errors)
        return Response({"Error": serializer.errors}, status=500)


class Borrow(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BorrowSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.borrow(serializer.validated_data)
            return Response({
                "data":data
            }, status=201)
        print(serializer.errors)
        return Response({
            "error": serializer.errors
        }, status=500)


class Repay(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RepaySerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.repay(serializer.validated_data)
            return Response({
                "data":data
            }, status=201)
        print(serializer.errors)
        return Response({
            "error": serializer.errors
        }, status=500)

