from celery import shared_task
from celery.utils.log import get_task_logger
from .data.cbdc_dict import data

@shared_task
def process_transactions_task():
    # from .models import Transaction
    from .functions import process_json_transactions
    process_json_transactions(data)
    


