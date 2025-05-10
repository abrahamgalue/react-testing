import React, { useState, useEffect, useCallback } from "react";
import { getOrders } from "../../services/getOrders";
import { Order } from "../../types/Orders";
import { OrderSummary } from "../../components/OrderSummary";
import { useSession } from "../../context/AuthContext";
import { handleValidateSuperAdmin } from "../../utils/validateRole";
import { OrderItem } from "../../components/OrderItem";
import { useNavigate } from "react-router-dom";
import classes from "./Orders.module.scss";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(user) fetchOrders();
  }, [fetchOrders, user]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className={classes.orders__loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={classes.orders__error}>{error}</div>;
  }

  const isSuperAdmin = handleValidateSuperAdmin(user.role);

  return (
    <section className={classes.orders}>
      <div className={classes.orders__container}>
        <h2 className={classes.orders__title}>Order History</h2>
        {isSuperAdmin && <OrderSummary orders={orders} />}
        <div className={classes.orders__list}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};
