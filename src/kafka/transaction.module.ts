import { Module } from '@nestjs/common';
import { TransactionProducerService } from './transaction-producer.service';

@Module({
  providers: [TransactionProducerService],
  exports: [TransactionProducerService],
})
export class TransactionModule {}
