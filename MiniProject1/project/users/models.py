from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Role(models.TextChoices):
    ADMIN = "admin", "Admin"
    TRADER = "trader", "Trader"
    SALES_REP = "sales_rep", "Sales Representative"
    CUSTOMER = "customer", "Customer"

class User(AbstractUser):
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    # Override the groups and user_permissions fields to avoid clashes
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Change related_name to avoid clash
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Change related_name to avoid clash
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username