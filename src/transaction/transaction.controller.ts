import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionDto, TransactionInfosDto } from './dto/transaction.dto';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @MessagePattern('init_transaction')
  async initTransaction(@Payload() message: TransactionDto) {
    return await this.transactionService.makeTransacion(message);
  }

  @MessagePattern('status')
  async updateTransactionStatus(@Payload() message: TransactionInfosDto) {
    return await this.transactionService.updateTransactionStatus(message);
  }

  @MessagePattern('clients_transactions')
  async clientsTransaction(@Payload() message: any) {
    return await this.transactionService.listClientTransaction(message);
  }
}
