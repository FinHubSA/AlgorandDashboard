release: python backend/django_app/manage.py makemigrations
release: python backend/django_app/manage.py migrate
release: python backend/django_app/manage.py loaddata backend/django_app/fixtures/model_fixtures.json
worker: sh -c 'cd ./backend/django_app/ && exec celery -A algorand_dashboard worker -l info'
web: gunicorn --pythonpath backend/django_app algorand_dashboard.wsgi