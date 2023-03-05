import { useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem';
import styles from '../assets/css/styles.module.css';


function OrderStatus() {
	/* 找出在 cartSlice.js 中被选中的物品 */
	const selectedItems = useSelector(
		state => state.cart_slice.item_list
	).filter(item => item.is_selected);

	return (
		<div >
			<div className={styles.orderStatusText}>
				<h2>Your order has been placed!</h2>
			</div>
			<div className={styles.orderWrapper}>
				<div className={styles.tableColumn}>
					<table>
						<thead>
						<tr>
							<th>IMAGE</th><th>NAME</th><th>CATEGORY</th>
							<th>DESCRIPTION</th><th>REVIEW</th><th>PRICE</th>
						</tr>
						</thead>
						<tbody >
						{selectedItems.map(item => (
							<OrderItem key={item.a_id} item={item}/>
						))}
						</tbody>
					</table>
				</div>
			</div>
			<div className={styles.orderStatusText}>
				<h4>
					<p>You may sign out from Employee Self Service now.</p>
					<p>Thank you for using our service.</p>
				</h4>
			</div>
		</div>
	);
}

export default OrderStatus;
