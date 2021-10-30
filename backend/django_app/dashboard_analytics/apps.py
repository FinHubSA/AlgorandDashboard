from django.apps import AppConfig
from .tasks import process_transactions_task

class DashboardAnalyticsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dashboard_analytics'

    def ready(self):
        process_transactions_task.delay()
