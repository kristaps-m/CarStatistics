export interface Root {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
}
