from django.views import generic
from .models import Post, Faq, Game
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings

def home(request):
    return render(request, 'index.html', {})

def portfolio(request):
    return render(request, 'portfolio.html', {})
