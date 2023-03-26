## syntax=docker/dockerfile:1

FROM python:3.12.0a5-slim

WORKDIR /python-docker

EXPOSE 5000

COPY packages.txt packages.txt
RUN pip3 install -r packages.txt

COPY . .

CMD [ "python3", "-m" , "app", "run", "--host=0.0.0.0"]