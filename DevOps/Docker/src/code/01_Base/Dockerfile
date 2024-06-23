FROM ubuntu:20.04

LABEL Name=ocup0311/hello
LABEL Version=base_1.0
EXPOSE 5566

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y python3.9 python3-pip python3.9-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY hello0.py /hello0.py
COPY hello1.py /hello1.py
COPY hello2.py /hello2.py

RUN groupadd -r user1 && useradd -r -g user1 user1

USER user1

ENTRYPOINT ["python3", "/hello0.py"]
ENTRYPOINT ["python3", "/hello1.py"]
ENTRYPOINT ["python3", "/hello2.py"]

CMD ["python3", "/hello0.py"]
CMD ["python3", "/hello1.py"]
CMD ["python3", "/hello2.py"]