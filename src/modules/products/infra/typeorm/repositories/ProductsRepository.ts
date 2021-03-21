import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({ where: { name } });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const findProductsById = products.map(product => product.id);

    const retProducts = this.ormRepository.find({
      where: { id: In(findProductsById) },
    });

    return retProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // const findProductsById = products.map(product => product.id);
    // let existentsProducts = [''];

    // await this.ormRepository
    //   .find({
    //     select: ['id'],
    //     where: { id: In(findProductsById) },
    //   })
    //   .then(productsFinded => {
    //     existentsProducts = productsFinded.map(product => product.id);
    //   });

    // const newProductsQtde = products.filter(function ({ id, quantity }) {
    //   if (existentsProducts.indexOf(id) !== -1) {
    //     return {
    //       id,
    //       quantity:
    //         findProductsById.filter(p => p.id === id)[0].quantity - quantity,
    //     };
    //   }

    //   return [];
    // });

    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
