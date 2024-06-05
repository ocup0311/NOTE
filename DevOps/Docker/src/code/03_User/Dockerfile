FROM python:3.9.5-slim

LABEL Name=ocup0311/hello
LABEL Version=user_1.0
EXPOSE 5566

ENV FLASK_APP=app.py

RUN pip install flask && \
    groupadd -r flask && useradd -r -g flask flask && \
    mkdir /src && \
    chown -R flask:flask /src

USER flask

COPY app.py /src/app.py
WORKDIR /src

CMD ["flask", "run", "-h", "0.0.0.0"]