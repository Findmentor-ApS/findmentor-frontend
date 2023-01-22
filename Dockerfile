FROM node:latest

ARG UID=1000
ARG GID=1000
RUN userdel -r node
RUN addgroup --system --gid $GID findmentor
RUN adduser --system --uid $UID --ingroup findmentor findmentor
USER findmentor

WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 4200
ENTRYPOINT ["sh", "build.sh"]
