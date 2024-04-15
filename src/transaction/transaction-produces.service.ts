import { Injectable } from '@nestjs/common';
import {
  ClientKafka,
  KafkaContext,
  MessagePattern,
} from '@nestjs/microservices';

@Injectable()
export class TransactionProducerService {
  constructor(private readonly clientKafka: ClientKafka) {}

  async sendTransactionEvent(data: any) {
    await this.clientKafka.emit('transaction-events', data);
  }
}
