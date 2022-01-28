import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './dto/get-user-request.dto';
import { UserShape } from './dto/user-shape.dto';

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

  getHello(): string {
    return 'Hello World!';
  }

  toBase64(val: string) {
    return Buffer.from(val).toString('base64');
  }

  stripeIdGenerator(id: string) {
    return `cus_${this.toBase64(id)}`
  }
  getUser(getUserRequest: GetUserRequest) {
    return this.users.find((user) => (user.userId) === getUserRequest.userId);
  }
}
