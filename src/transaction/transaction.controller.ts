import { Controller, Post, Body } from '@nestjs/common';
import { TransactionProducerService } from './transaction-produces.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionProducerService: TransactionProducerService,
  ) {}

  @Post()
  async createTransaction(@Body() data: any) {
    await this.transactionProducerService.sendTransactionEvent(data);
    return { message: 'Transação criada com sucesso!' };
  }
}
