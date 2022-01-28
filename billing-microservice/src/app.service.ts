import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './dto/get-user-request.dto';
import { UserShape } from './dto/user-shape.dto';
import { OrderCreatedEvent } from './event/order-created.event';

@Injectable()
export class AppService {
  private readonly users: UserShape[] = [
    {
      userId: 'Ln33WuxDd0xQA1sauLTz6ZrSKkEG4JUyT1z+AYBouYE=',
      stripeUserId: this.stripeIdGenerator(
        'b8386c18b74ba771b2c0007bd7cd68e0cdf814675b15d56e431eda3e3781dc9e'
      )
    },
    {
      userId: 'A+npqCqRLhxRluJtR7FPugd8GA+Yns+C/0HL5Qf8VGM=',
      stripeUserId: this.stripeIdGenerator(
        '74525c9f1a727d7e5fcfc1f2c8bdd558d40083e697f2bfc9580e56c4cf970d4f'
      )
    }
  ];
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  toBase64(val: string) {
    return Buffer.from(val).toString('base64');
  }

  stripeIdGenerator(id: string) {
    return `cus_${this.toBase64(id)}`
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    return this.authClient
      .send<UserShape, GetUserRequest>(
        'get_user.reply',
        new GetUserRequest(this.users[0].userId)
      )
      .subscribe((user: UserShape) => {
        return console.log(
          `Billing user with stripe ID ${
           user.stripeUserId
          } for the amount of $${orderCreatedEvent.price.toPrecision(4)}...`
        );
      });
  }
}
/**
 * function toBase64(val: string) {
  return Buffer.from(val).toString('base64');
}
const stripeIdGenerator = (id: string) => `cus_${toBase64(id)}`;

@Injectable()
export class AppService {
  private readonly users: UserShape[] = [
    {
      userId: 'Ln33WuxDd0xQA1sauLTz6ZrSKkEG4JUyT1z+AYBouYE=',
      stripeUserId: stripeIdGenerator(
        'b8386c18b74ba771b2c0007bd7cd68e0cdf814675b15d56e431eda3e3781dc9e'
      )
    },
    {
      userId: 'A+npqCqRLhxRluJtR7FPugd8GA+Yns+C/0HL5Qf8VGM=',
      stripeUserId: stripeIdGenerator(
        '74525c9f1a727d7e5fcfc1f2c8bdd558d40083e697f2bfc9580e56c4cf970d4f'
      )
    }
  ];
 */
