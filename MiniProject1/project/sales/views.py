from rest_framework import viewsets, permissions
from .models import SalesOrder, Invoice
from .serializers import SalesOrderSerializer, InvoiceSerializer

class SalesOrderViewSet(viewsets.ModelViewSet):
    queryset = SalesOrder.objects.all()
    serializer_class = SalesOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        """Передаём request в сериализатор для генерации pdf_url"""
        return {"request": self.request}