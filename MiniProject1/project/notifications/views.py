from rest_framework import viewsets, permissions
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):  # Отключаем при Swagger
            return Notification.objects.none()

        user = self.request.user
        if user.is_anonymous:
            return Notification.objects.none()
        return Notification.objects.filter(user=user)