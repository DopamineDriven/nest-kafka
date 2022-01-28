import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
type PromiseOrValue<T> = PromiseLike<T> | T;
type InferData<T> = T extends PromiseOrValue<infer U> ? U : T;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('order_created')
  handleOrderCreated<
    T extends { value: any } extends infer U ? U : { value: any }
    >(data: InferData<T>) {
    console.log(data ?? "no data");
    this.appService.handleOrderCreated(data.value);
  }
}
