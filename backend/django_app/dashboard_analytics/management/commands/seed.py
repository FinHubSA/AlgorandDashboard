from django.core.management.base import BaseCommand, CommandError
import requests
from django.db import models
from dashboard_analytics.models import AccountType, InstrumentType, Account, Transaction
import json
from algosdk.v2client import indexer
import pandas as pd


# file to indexer API and save into postgres database
# Indexer port configuration
ALGOD_ADDRESS = "http://localhost:4001"
ALGOD_TOKEN = "a" * 64
INDEXER_ADDRESS = "http://localhost:8980"
INDEXER_TOKEN = ALGOD_TOKEN
indexer_client = indexer.IndexerClient(INDEXER_TOKEN, INDEXER_ADDRESS)

#print("Transaction search: " + json.dumps(transactions, indent=2, sort_keys=True))


def get_accounts():
    print("Begin grabbing data from indexer API")
    # grab all accounts
    accounts = indexer_client.accounts()
    #


def seed_data():
    print("Begin seeding data into database")
    # code below


class Command(BaseCommand):
    help = "Seed database with Indexer API"

    def handle(self, *args, **options):
        indexer_client = indexer.IndexerClient(INDEXER_TOKEN, INDEXER_ADDRESS)
        transactions = indexer_client.search_transactions()
        accounts = indexer_client.accounts()
        self.stdout.write("Accounts" + json.dumps(accounts,
                          indent=2, sort_keys=True))  # NEW
        # seed_data()
        self.stdout.write("Transactions" + json.dumps(transactions,
                          indent=2, sort_keys=True))
        self.stdout.write("completed")
