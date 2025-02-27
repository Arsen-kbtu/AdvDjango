from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet, RegisterView, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView
from products.views import ProductViewSet, CategoryViewSet
from trading.views import OrderViewSet
from sales.views import SalesOrderViewSet, InvoiceViewSet
from analytics.views import AnalyticsReportViewSet
from notifications.views import NotificationViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'sales-orders', SalesOrderViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'analytics-reports', AnalyticsReportViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
]

schema_view = get_schema_view(
    openapi.Info(
        title="Sales and Trading App API",
        default_version="v1",
        description="API documentation for Sales and Trading App",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns += [
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)