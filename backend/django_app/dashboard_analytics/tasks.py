from celery import shared_task
from celery.utils.log import get_task_logger

@shared_task
def process_transactions_task():
    


