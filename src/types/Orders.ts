export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: string;
  orderDate: string;
  paymentMethod: string;
}
