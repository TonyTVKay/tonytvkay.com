from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


STATUS = (
    (0,"Draft"),
    (1,"Publish")
)
 
class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    image_path = models.CharField(max_length=200)
    video_path = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog_posts')
    updated_on = models.DateTimeField(auto_now= True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    difficulty = models.PositiveIntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(5)])
    difficultyLeft = models.PositiveIntegerField(default=2, validators=[MinValueValidator(1), MaxValueValidator(5)])
    trailer1 = models.CharField(default="none", max_length=200)
    trailer2 = models.CharField(default="none", max_length=200)
    trailer3 = models.CharField(default="none", max_length=200)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title

class Faq(models.Model):
    question = models.CharField(max_length=400, unique=True)
    answer = models.CharField(max_length=400, unique=True)

    def __str__(self):
        return self.question

class Game(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    image_path = models.CharField(max_length=200)
    download_path = models.CharField(max_length=200)
    updated_on = models.DateTimeField(auto_now= True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    difficulty = models.PositiveIntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(5)])
    difficultyLeft = models.PositiveIntegerField(default=2, validators=[MinValueValidator(1), MaxValueValidator(5)])
    trailer1 = models.CharField(default="none", max_length=200)
    trailer2 = models.CharField(default="none", max_length=200)
    trailer3 = models.CharField(default="none", max_length=200)
    link = models.CharField(max_length=200)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
