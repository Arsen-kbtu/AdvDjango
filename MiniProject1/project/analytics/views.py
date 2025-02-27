from rest_framework import viewsets, permissions
from .models import AnalyticsReport
from .serializers import AnalyticsReportSerializer

class AnalyticsReportViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsReport.objects.all()
    serializer_class = AnalyticsReportSerializer
    permission_classes = [permissions.IsAdminUser]