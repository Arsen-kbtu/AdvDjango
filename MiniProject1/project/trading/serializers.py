from rest_framework import serializers
from .models import Order
from users.models import User

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user"]

