import { StatusBadge } from "../../components/StatusBadge";
import { Order } from "../../types/Orders";
import classes from "./OrderItem.module.scss";

export const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={classes.OrderItem}>
      <div className={classes.OrderItem__header}>
        <h3 className={classes.OrderItem__id}>Order #{order.id.slice(0, 8)}</h3>
        <p className={classes.OrderItem__date}>{formatDate(order.orderDate)}</p>
        <StatusBadge status={order.status} />
      </div>
      <div className={classes.OrderItem__customer}>
        <p className={classes.OrderItem__customerName}>{order.customer.name}</p>
        <p className={classes.OrderItem__customerEmail}>
          {order.customer.email}
        </p>
      </div>
      <div className={classes.OrderItem__products}>
        <h4 className={classes.OrderItem__productsTitle}>Order Items:</h4>
        <ul className={classes.OrderItem__productsList}>
          {order.products.map((product) => (
            <li key={product.id} className={classes.OrderItem__productsItem}>
              <span>
                {product.name} x{product.quantity}
              </span>
              <span>${(product.price * product.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.OrderItem__footer}>
        <div className={classes.OrderItem__payment}>
          <p className={classes.OrderItem__paymentLabel}>Payment Method</p>
          <p className={classes.OrderItem__paymentMethod}>
            {order.paymentMethod.replace("_", " ")}
          </p>
        </div>
        <div className={classes.OrderItem__total}>
          <p className={classes.OrderItem__totalLabel}>Total Amount</p>
          <p className={classes.OrderItem__totalAmount}>
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
