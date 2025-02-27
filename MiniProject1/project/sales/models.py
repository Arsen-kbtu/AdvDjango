from django.db import models
from users.models import User
from products.models import Product

class SalesOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="sales")
    total_quantity = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Sales for {self.product.name}: {self.total_quantity} units"

class Invoice(models.Model):
    sales_order = models.OneToOneField(SalesOrder, on_delete=models.CASCADE, related_name="invoice")
    issued_at = models.DateTimeField(auto_now_add=True)
    pdf_file = models.FileField(upload_to="invoices/")

    def __str__(self):
        return f"Invoice {self.id} for Order {self.sales_order.id}"