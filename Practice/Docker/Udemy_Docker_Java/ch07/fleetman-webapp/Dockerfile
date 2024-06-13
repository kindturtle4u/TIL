#FROM tomcat:8.5.47-jdk8-openjdk
#FROM tomcat:8.5.47-jdk8-corretto
#
#MAINTAINER Richard Chesterwood "contact@virtualpairprogrammers.com"
#
##EXPOSE 8080
##
#RUN rm -rf ./webapps/*
##
#COPY ./target/fleetman-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war
##
#ENV JAVA_OPTS="-Dspring.profiles.active=docker-demo"
#
#CMD ["catalina.sh", "run"]


FROM openjdk:8u131-jdk-alpine

MAINTAINER Richard Chesterwood "contact@virtualpairprogrammers.com"

EXPOSE 8080

WORKDIR /usr/local/bin/

COPY ./target/fleetman-0.0.1-SNAPSHOT.jar webapp.jar

CMD ["java", "-Dspring.profiles.active=docker-demo", "-jar", "webapp.jar"]
