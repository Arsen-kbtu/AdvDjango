from django.db import models

class AnalyticsReport(models.Model):
    report_type = models.CharField(max_length=255)
    generated_at = models.DateTimeField(auto_now_add=True)
    report_file = models.FileField(upload_to="reports/")

    def __str__(self):
        return f"Report {self.id} - {self.report_type}"