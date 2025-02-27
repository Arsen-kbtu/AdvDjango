from rest_framework import serializers
from .models import SalesOrder, Invoice

class SalesOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOrder
        fields = ["id", "product", "total_quantity", "total_revenue"]
        read_only_fields = ["id"]

class InvoiceSerializer(serializers.ModelSerializer):
    pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = Invoice
        fields = ["id", "sales_order", "issued_at", "pdf_url"]

    def get_pdf_url(self, obj):
        """Генерация URL для скачивания PDF"""
        if obj.pdf_file:
            return self.context["request"].build_absolute_uri(obj.pdf_file.url)
        return None