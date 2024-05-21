FROM ubuntu:latest

MAINTAINER Richard Chesterwood "contact@virtualpairprogrammers.com"

RUN apt-get update && apt-get install -y openjdk-8-jdk

WORKDIR /usr/local/bin/

ADD test-program.jar .

ENTRYPOINT ["java", "-jar", "test-program.jar"]
