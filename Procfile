release: python backend/django_app/manage.py migrate
release: python backend/django_app/manage.py loaddata backend/django_app/fixtures/model_fixtures.json
web: gunicorn --pythonpath backend/django_app algorand_dashboard.wsgi