from django.db.models.signals import post_save
from django.dispatch import receiver
from trading.models import Order
from sales.models import SalesOrder, Invoice
from decimal import Decimal
from sales.utils import generate_invoice

@receiver(post_save, sender=Order)
def update_sales_on_order(sender, instance, created, **kwargs):
    if created:  # Только если создаётся новый заказ
        sales_entry, _ = SalesOrder.objects.get_or_create(product=instance.product)

        # Обновляем количество и выручку
        sales_entry.total_quantity += instance.quantity
        sales_entry.total_revenue += instance.quantity * Decimal(instance.product.price)
        sales_entry.save()

@receiver(post_save, sender=SalesOrder)
def update_or_create_invoice(sender, instance, created, **kwargs):
    """Обновляем инвойс при каждом обновлении SalesOrder"""
    
    # Генерируем новый PDF
    invoice_path = generate_invoice(instance)
    
    # Обновляем или создаем Invoice
    invoice, _ = Invoice.objects.update_or_create(
        sales_order=instance,
        defaults={"pdf_file": invoice_path}  # Обновляем PDF
    )
    
    print(f"Invoice обновлён: {invoice.pdf_file}")