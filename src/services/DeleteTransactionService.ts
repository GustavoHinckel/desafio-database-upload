import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionsRepository.find({ id });
    console.log(transaction);
    if (!transaction) {
      throw new AppError('This transaction does not exist');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
