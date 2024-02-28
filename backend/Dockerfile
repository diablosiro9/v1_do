FROM python:3

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN pip install --upgrade pip  
RUN pip install django-bootstrap-toolkit
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg2
COPY . .

EXPOSE 443

# Add entrypoint script to wait for database availability
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Run the entrypoint script instead of directly starting the Django server
CMD ["/usr/src/app/entrypoint.sh"]