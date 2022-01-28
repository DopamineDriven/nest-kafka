import { Inject, Controller, Get, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
// import { HandleOrderCreatedShape } from "./dto/handle-order-created-shape.dto";

type PromiseOrValue<T> = PromiseLike<T> | T;
type InferData<T> = T extends PromiseOrValue<infer U> ? U : T;
@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('order_created', Transport.KAFKA)
  handleOrderCreated<
    T extends { value: any } extends infer U ? U : { value: any }
  >(data: InferData<T>) {
    console.log(data ?? 'no data');
    this.appService.handleOrderCreated(data.value);
  }

  onModuleInit() {
   this.authClient.subscribeToResponseOf("get_user.reply");
  }
}
