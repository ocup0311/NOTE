FROM python:3.9.5-slim

LABEL Name=ocup0311/05_compose
LABEL Version=1.0
EXPOSE 5000

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
RUN pip install flask redis && \
    groupadd -r flask && useradd -r -g flask flask && \
    mkdir /src && \
    chown -R flask:flask /src

USER flask

COPY app.py /src/app.py

WORKDIR /src

ENV FLASK=app.py REDIS_HOST=redis

CMD ["flask", "run", "-h", "0.0.0.0"]