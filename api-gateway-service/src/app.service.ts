import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create-order-request.dto';
import { OrderCreatedEvent } from './event/order-created.event';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(@Inject("BILLING_SERVICE") private readonly billingClient: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit('order_created', new OrderCreatedEvent(v4(), userId, price ))
  }
}
