from celery import shared_task
from sales.utils import generate_invoice
from sales.models import Invoice

@shared_task
def regenerate_invoice(sales_order_id):
    """Асинхронно обновляет инвойс при изменении SalesOrder."""
    from sales.models import SalesOrder  # Импорт внутри, чтобы избежать циклических импортов

    try:
        sales_order = SalesOrder.objects.get(id=sales_order_id)
        invoice_path = generate_invoice(sales_order)
        
        # Обновляем или создаём инвойс
        invoice, _ = Invoice.objects.update_or_create(
            sales_order=sales_order,
            defaults={"pdf_file": invoice_path}  # Обновляем PDF
        )
        return f"Invoice обновлён: {invoice.pdf_file}"
    except SalesOrder.DoesNotExist:
        return "Ошибка: SalesOrder не найден"
