import { Order } from "../types/Orders";

export const getSummaryOrders = (orders: Order[]) => {
  const totalOrders = orders.length;
  const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalValue / totalOrders;
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { totalOrders, totalValue, averageOrderValue, ordersByStatus };
};