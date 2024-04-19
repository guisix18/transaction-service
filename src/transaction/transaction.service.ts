import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionStatus } from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import {
  TransactionDto,
  TransactionInfosDto,
} from '../transaction/dto/transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CLIENT_SERVICE') private readonly clientServiceClient: ClientKafka,
  ) {}

  async makeTransacion(data: TransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        senderUserId: data.senderUserId,
        receiverUserId: data.receiverUserId,
        amount: data.amount,
      },
    });

    await lastValueFrom(
      this.clientServiceClient.emit('transaction_created', transaction),
    );
    return;
  }

  async updateTransactionStatus(data: TransactionInfosDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: data.transactionId,
      },
    });

    if (transaction.status !== TransactionStatus.PENDING) return;

    if (data.option === TransactionStatus.COMPLETED) {
      return await Promise.all([
        this.prisma.transaction.update({
          where: {
            id: data.transactionId,
            status: TransactionStatus.PENDING,
          },
          data: {
            status: data.option,
          },
        }),
        this.prisma.transactionHistory.create({
          data: {
            transferred_in: new Date(),
            transaction_id: data.transactionId,
          },
        }),
      ]);
    }

    if (data.option === TransactionStatus.ERRORED) {
      return await Promise.all([
        this.prisma.transaction.update({
          where: {
            id: data.transactionId,
            status: TransactionStatus.PENDING,
          },
          data: {
            status: data.option,
          },
        }),
        this.prisma.transactionHistory.create({
          data: {
            transferred_in: new Date(),
            transaction_id: data.transactionId,
          },
        }),
      ]);
    }
  }

  async listClientTransaction(data: any) {
    const clientTransactions = await this.prisma.transaction.findMany({
      where: {
        senderUserId: data.userId,
      },
      include: {
        TransactionHistory: {
          select: {
            transferred_in: true,
          },
        },
      },
    });

    return clientTransactions;
  }
}
