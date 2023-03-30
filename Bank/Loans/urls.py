from django.urls import path
from .views import CreateLoanAccount, Borrow, Repay

urlpatterns = [
    path('create-loan-account/', CreateLoanAccount.as_view(), name='create-loan-account'),
    path('borrow/', Borrow.as_view, name='borrow'),
    path('repay/', Repay.as_view, name='repay')
]