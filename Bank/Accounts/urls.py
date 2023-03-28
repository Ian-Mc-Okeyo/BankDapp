from django.urls import path
from .views import Register, Deposit, Transfer, Withdraw

urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('deposit/', Deposit.as_view(), name='deposit'),
    path('transfer/', Transfer.as_view(), name='transfer'),
    path('withdraw/', Withdraw.as_view(), name='withdraw')
]