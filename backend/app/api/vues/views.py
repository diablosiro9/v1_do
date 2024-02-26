from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

# @login_required
def accueil(request):
    return render(request, 'accueil.html')

def create_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # You may want to add validation here
        user = User.objects.create_user(username=username, password=password)
        # You can redirect to a success page or render a template here
        if request.user.is_authenticated:
            return HttpResponseRedirect('/accueil/')  # Redirect to accueil page if already authenticated
        else:
            return HttpResponseRedirect('/accueil/')  # Redirect to index page if not authenticated
    else:
        return render(request, 'index.html')
