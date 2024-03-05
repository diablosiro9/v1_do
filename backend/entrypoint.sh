#!/bin/bash

# Wait for the database service to become available
until pg_isready -U mehdi -d ft_transcendence_database -h ft_transcendence_database -p 5432 -q; do
  echo "Waiting for the database service to become available..."
  sleep 1
done

python /usr/src/app/app/manage.py createsuperuser

# Collect static files
python /usr/src/app/app/manage.py collectstatic --no-input

# Once the database service is available, run migrations
python /usr/src/app/app/manage.py migrate

# Start the Django development server
exec python /usr/src/app/app/manage.py runserver 0.0.0.0:443

