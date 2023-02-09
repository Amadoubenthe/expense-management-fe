import { Product } from '../product/product';

export interface Command {
  id: number;
  designation: string;
  status: string;
  amount: number;
  userId: number;
  siteId: number;
  productId: number;
  createdAt: any;
  categoryId: number;
  Product: Product;
}
