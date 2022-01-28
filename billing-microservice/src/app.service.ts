import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './event/order-created.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
   return console.log(JSON.stringify(orderCreatedEvent, null, 2));
  }
}
