from .views import Post, Game

def rooms(request):
    rooms = Post.objects.all()
    return {"rooms": rooms}

def games(request):
    rooms = Game.objects.all()
    return {"games": games}