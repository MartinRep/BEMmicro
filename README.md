# Best Ever Me Platform
This is a project created for Best Ever Me world ltd. to incorporate existing and future services and products of the business. It is based on microservices architecture.

This application is configured for Service Discovery and Configuration with the JHipster-Registry. On launch, it will refuse to start if it is not able to connect to the JHipster-Registry at [http://localhost:8761](http://localhost:8761). For more information, read our documentation on [Service Discovery and Configuration with the JHipster-Registry][].

To run this service:
* For production profile run from jhipster-registry-master folder: `./mvnw -Pprod`

## gateway
This is a "gateway" application intended to be part of a microservice architecture

For development profile run from gateway folder: `./gradlew`

## request
This is a "Request" microservice application intended to be part of a microservice architecture

For development profile run from request folder: `./gradlew`

## lastminute
This is a "Last-minute" microservice application intended to be part of a microservice architecture

For development profile run from lastminute folder: `./gradlew`

## BemApp
This is a Ionic based mobile application inteded to be used on top of the gateway application and all it's dependencies.

For development profile run from BemApp folder: `ionic serve -l`

## Demo

https://www.youtube.com/watch?v=xVc7xMLfHl4