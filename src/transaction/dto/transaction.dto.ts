import { TransactionStatus } from '@prisma/client';

export class TransactionDto {
  senderUserId: string;
  receiverUserId: string;
  amount: number;
}

export class TransactionInfosDto {
  transactionId: string;
  option: TransactionStatus;
}
