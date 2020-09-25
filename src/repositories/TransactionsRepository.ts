import { EntityRepository, getRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    let incomeCalc = 0;
    let outcomeCalc = 0;

    const income = transactions.reduce((_accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        incomeCalc += currentValue.value;
      }

      return incomeCalc;
    }, 0);

    const outcome = transactions.reduce((_accumulator, currentValue) => {
      if (currentValue.type === 'outcome') {
        outcomeCalc += currentValue.value;
      }

      return outcomeCalc;
    }, 0);

    const total = income - outcome;
    const balance = { income, outcome, total };

    return balance;
  }
}

export default TransactionsRepository;
