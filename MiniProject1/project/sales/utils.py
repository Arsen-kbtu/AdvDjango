from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os
from django.conf import settings

def generate_invoice(sales_order):
    """Генерация PDF-инвойса для заказа."""
    filename = f"invoice_{sales_order.id}.pdf"
    file_path = os.path.join(settings.MEDIA_ROOT, "invoices", filename)

    os.makedirs(os.path.dirname(file_path), exist_ok=True)  # Создание папки, если её нет

    c = canvas.Canvas(file_path, pagesize=A4)
    c.drawString(100, 800, f"Invoice #{sales_order.id}")
    c.drawString(100, 780, f"Product: {sales_order.product.name}")
    c.drawString(100, 760, f"Quantity: {sales_order.total_quantity}")
    c.drawString(100, 740, f"Total Revenue: ${sales_order.total_revenue}")
    # c.drawString(100, 720, f"Generated for: {sales_order.created_at.strftime('%Y-%m-%d')}")

    c.save()
    return file_path  # Возвращает путь к файлу
