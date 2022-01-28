# nest-kafka-2022
Kafka, Nestjs Api Gateway, Microservices

## Clone the [Kafka/Kafdrop Repo](https://github.com/obsidiandynamics/kafdrop) in a separate directory
- Kafdrop is a GUI that is used to monitor Kafka events -- once booted up it runs on localhost:9000
- from the command line in an arbitrarily named directory of your choosing, run
```bash
cd docker-compose/kafka-kafdrop

docker-compose up
```
- Ensure that you have Docker running on your machine or Kafdrop won't spin up
- Once running, navigate to localhost:9000 in your browser

![Kafdrop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s9r5a6z77pyiw3ypr7kv.png)

- now you can monitor Kafka like a helicopter parent does their college freshman

## Three separate repos within the api-gateway directory for Separation of Concerns
1. api-gateway
2. auth
3. billing
- The api-gateway __dir interacts with HTTP requests
- The billing __dir is a microservice for handling billing
- The auth __dir is a microservice for handling users and sensitive info such as stripe ids