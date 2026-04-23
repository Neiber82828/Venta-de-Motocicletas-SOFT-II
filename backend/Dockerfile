FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

RUN printf '#!/bin/bash\nset -e\npython manage.py migrate --noinput\npython manage.py seed_data\nexec gunicorn config.wsgi:application --bind 0.0.0.0:8000\n' > entrypoint.sh && chmod +x entrypoint.sh

CMD ["bash", "entrypoint.sh"]
