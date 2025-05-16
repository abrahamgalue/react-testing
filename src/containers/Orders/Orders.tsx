import { OrderSummary } from '../../components/OrderSummary'
import { handleValidateSuperAdmin } from '../../utils/validateRole'
import { OrderItem } from '../../components/OrderItem'
import classes from './Orders.module.scss'
import { useOrders } from '../../hooks/useOrders'

export const Orders: React.FC = () => {
  const { user, orders, loading, error } = useOrders()

  if (!user) {
    return null
  }

  if (loading) {
    return <div className={classes.orders__loading}>Loading orders...</div>
  }

  if (error) {
    return <div className={classes.orders__error}>{error}</div>
  }

  const isSuperAdmin = handleValidateSuperAdmin(user.role)

  return (
    <section className={classes.orders}>
      <div className={classes.orders__container}>
        <h2 className={classes.orders__title}>Order History</h2>
        {isSuperAdmin && <OrderSummary orders={orders} />}
        <div className={classes.orders__list}>
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  )
}
