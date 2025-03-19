from django.db import models 
from django.contrib.auth.models import AbstractUser 
 

class Item(models.Model): 

    name = models.CharField(max_length=100) 

    description = models.TextField() 

class User(AbstractUser): 

    ROLE_CHOICES = [ 

        ('admin', 'Admin'), 

        ('user', 'User'), 

    ] 

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user') 
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )
    