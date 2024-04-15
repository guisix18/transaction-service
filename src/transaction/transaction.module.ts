import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionProducerService } from './transaction-produces.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionProducerService],
  exports: [TransactionProducerService],
})
export class TransactionModule {}
