from rest_framework import serializers
from .models import AnalyticsReport

class AnalyticsReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsReport
        fields = ["id", "report_type", "generated_at", "report_file"]
        read_only_fields = ["id", "generated_at"]