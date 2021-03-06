# nest-kafka

![Kafka Microservices](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qlqbwcjmy0sh459hxzlc.png)

## Clone the [Kafka/Kafdrop Repo](https://github.com/obsidiandynamics/kafdrop) in a separate directory
- Kafdrop is a GUI that is used to monitor Kafka events -- once booted up it runs on localhost:9000
- From the command line in an arbitrarily named directory of your choosing, run
```bash
cd docker-compose/kafka-kafdrop

docker-compose up -d
```
- Ensure that you have Docker running on your machine or Kafdrop won't spin up
- Once running, navigate to localhost:9000 in your browser

![Kafdrop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0kybolddzl4h6mqzmb4p.png)

- now you can monitor Kafka like a helicopter parent does their college freshman

## Three separate Nest Directories for Separation of Concerns
1. api-gateway-service
2. auth-microservice
3. billing-microservice
- The api-gateway-service __dir interacts with HTTP requests
- The billing-microservice __dir is a microservice for handling billing
- The auth-microservice __dir is a microservice for handling users and sensitive info such as stripe ids

---
## Api-Gateway-Service
- from your terminal, cd into the root of the api-gateway-service.
- First, install the dependencies. Then, start the dev server:

```bash
cd api-gateway-service && yarn install && yarn start:dev
```

- The above command should output something similar to the following

```bash
[1:56:08 AM] Starting compilation in watch mode...

[1:56:10 AM] Found 0 errors. Watching for file changes.

[Nest] 3938  - 01/28/2022, 1:56:10 AM     LOG [NestFactory] Starting Nest application...
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [InstanceLoader] ClientsModule dependencies initialized +26ms
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [RoutesResolver] AppController {/}: +6ms
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [RouterExplorer] Mapped {/, GET} route +3ms
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [RouterExplorer] Mapped {/, POST} route +1ms
[Nest] 3938  - 01/28/2022, 1:56:11 AM     LOG [NestApplication] Nest application successfully started +3ms
```

---

## Billing-Microservice
- from your terminal, cd into the root of the billing-microservice
- First, install the dependencies. Then, start the microservice:

```bash
cd billing-microservice && yarn install && yarn start:dev
```

- The above command should output something similar to the following

```bash
[1:59:45 AM] Starting compilation in watch mode...

[1:59:47 AM] Found 0 errors. Watching for file changes.

[Nest] 4350  - 01/28/2022, 1:59:48 AM     LOG [NestFactory] Starting Nest application...
[Nest] 4350  - 01/28/2022, 1:59:48 AM     LOG [InstanceLoader] AppModule dependencies initialized +23ms
[Nest] 4350  - 01/28/2022, 1:59:48 AM     LOG [ServerKafka] INFO [Consumer] Starting {"timestamp":"2022-01-28T07:59:48.261Z","logger":"kafkajs","groupId":"billing-consumer-server"}
[Nest] 4350  - 01/28/2022, 1:59:48 AM     LOG [ServerKafka] INFO [ConsumerGroup] Consumer has joined the group {"timestamp":"2022-01-28T07:59:48.320Z","logger":"kafkajs","groupId":"billing-consumer-server","memberId":"nestjs-consumer-server-75a33998-e62b-44bc-bece-5e470d61222e","leaderId":"nestjs-consumer-server-75a33998-e62b-44bc-bece-5e470d61222e","isLeader":true,"memberAssignment":{"order_created":[0]},"groupProtocol":"RoundRobinAssigner","duration":58}
[Nest] 4350  - 01/28/2022, 1:59:48 AM     LOG [NestMicroservice] Nest microservice successfully started +5ms
```

### Postman
- open postman 
- create a new POST request targeting localhost:3000 (the port our api-gateway-service is listening on)
- the POST request body should contain `userId` string and `price` float values as pictured below

![PostmanToKafkaEvent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sltyof2s5doehmg35nrr.png)

- click "send" in Postman then check your `api-gateway-service` terminal
- you should see two new `[ClientKafka]` log events as follows

```bash
[Nest] 3938  - 01/28/2022, 2:05:15 AM     LOG [ClientKafka] INFO [Consumer] Starting {"timestamp":"2022-01-28T08:05:15.344Z","logger":"kafkajs","groupId":"billing-consumer-client"}
[Nest] 3938  - 01/28/2022, 2:05:15 AM     LOG [ClientKafka] INFO [ConsumerGroup] Consumer has joined the group {"timestamp":"2022-01-28T08:05:15.395Z","logger":"kafkajs","groupId":"billing-consumer-client","memberId":"billing-client-23ad2886-d535-4042-b33a-6e08e8f35fce","leaderId":"billing-client-23ad2886-d535-4042-b33a-6e08e8f35fce","isLeader":true,"memberAssignment":{},"groupProtocol":"NestReplyPartitionAssigner","duration":39}
```

- now, check the terminal that your `billing-microservice` is listening on
- you should see a JSON object returned by the post call as follows

```bash
{
  magicByte: 2,
  attributes: 0,
  timestamp: '1643357115411',
  offset: '1',
  key: null,
  value: {
    orderId: 'a6ef7a3f-ba8f-4a8d-a947-90eb2d6ff1b1',
    userId: '345',
    price: 34.99
  },
  headers: {},
  isControlRecord: false,
  batchContext: {
    firstOffset: '1',
    firstTimestamp: '1643357115411',
    partitionLeaderEpoch: 0,
    inTransaction: false,
    isControlBatch: false,
    lastOffsetDelta: 0,
    producerId: '-1',
    producerEpoch: 0,
    firstSequence: 0,
    maxTimestamp: '1643357115411',
    timestampType: 0,
    magicByte: 2
  },
  topic: 'order_created',
  partition: 0
}
```

- this is the shape of the Handle Order Created Event
- note that the value field, which is a JSON object, contains the fields we've defined in our code


--- 
## Auth Microservice 
- from your terminal, cd into the root of the auth-microservice
- First, install the dependencies. Then, start the microservice:

```bash
cd auth-microservice && yarn install && yarn start:dev
```

- The above command should output something similar to the following

```bash
[1:59:45 AM] Starting compilation in watch mode...

[1:59:47 AM] Found 0 errors. Watching for file changes.

[Nest] 15622  - 01/28/2022, 2:01:44 AM     LOG [NestFactory] Starting Nest application...
[Nest] 15622  - 01/28/2022, 2:01:44 AM     LOG [InstanceLoader] AppModule dependencies initialized +25ms
[Nest] 15622  - 01/28/2022, 2:01:44 AM     LOG [ServerKafka] INFO [Consumer] Starting {"timestamp":"2022-01-28T10:36:44.338Z","logger":"kafkajs","groupId":"auth-consumer-server"}
[Nest] 15622  - 01/28/2022, 2:01:10 AM     LOG [ServerKafka] INFO [ConsumerGroup] Consumer has joined the group {"timestamp":"2022-01-28T10:37:10.035Z","logger":"kafkajs","groupId":"auth-consumer-server","memberId":"nestjs-consumer-server-2ffa5ec8-65f7-48fb-9534-74b86fc74713","leaderId":"nestjs-consumer-server-2ffa5ec8-65f7-48fb-9534-74b86fc74713","isLeader":true,"memberAssignment":{"get_user.reply":[0]},"groupProtocol":"RoundRobinAssigner","duration":25696}
[Nest] 15622  - 01/28/2022, 2:01:10 AM     LOG [NestMicroservice] Nest microservice successfully started +7ms
```

- Head to postman and input this as the body of a POST request to localhost:3000

```json
{
	"userId": "Ln33WuxDd0xQA1sauLTz6ZrSKkEG4JUyT1z+AYBouYE=",
	"price": 34.99
}
```

- The first image in the readme showcases the response you should receive in the auth and billing microservices terminals

