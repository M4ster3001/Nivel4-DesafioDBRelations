import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Customer não encontrado');
    }

    return customer;
  }
}

export default CreateCustomerService;
