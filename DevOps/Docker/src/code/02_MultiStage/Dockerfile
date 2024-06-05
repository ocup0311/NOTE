# stage 1
FROM gcc:9.4 AS builder

COPY hello.c /src/hello.c
WORKDIR /src

RUN gcc --static -o hello hello.c


# stage 2
FROM alpine:3.13.5

LABEL Name=ocup0311/hello
LABEL Version=multi_stage_1.0
EXPOSE 5566

COPY --from=builder /src/hello /src/hello

ENTRYPOINT [ "/src/hello" ]
CMD []