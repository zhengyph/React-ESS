import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleToggleItem, handleToggleAllItems, overBudget } from '../store/slices/cartSlice';
import CartItem from '../components/CartItem';
import styles from '../assets/css/styles.module.css'


function Cart() {

	const MAX_AMOUNT = 3000;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [warning, setWarning] = useState('');

	const itemList = useSelector(state => state.cart_slice.item_list);
	const selectAll = useSelector(state => state.cart_slice.all_selected);
	const totalPrice = useSelector(state => state.cart_slice.total_price);

	const toggleItemHandler = (item) => {
		dispatch(handleToggleItem(item));
	}

	const toggleAllItemsHandler = () => {
		dispatch(handleToggleAllItems());
	}

	/**
	 * checkPrice 检测已选 item 的价格是否超出最大额度，如果超出，则产生警告信息
	 * useCallback 确保 checkPrice 只在 totalPrice, dispatch, setWarning 这些依赖项发生变化时才重新创建。
	 */
	const checkPrice = useCallback(() => {
		if (totalPrice === 0) {
			dispatch(overBudget(true));
			setWarning('Must select at least one item.');
		} else if (totalPrice > MAX_AMOUNT) {
			dispatch(overBudget(true));
			setWarning(`Sorry, total price of selections cannot exceed $${MAX_AMOUNT}.`);
		} else {
			dispatch(overBudget(false));
			setWarning('');
		}
	}, [totalPrice, dispatch, setWarning]);

	/* 监听 totalPrice 值和 checkPrice 方法的变化 */
	useEffect(() => { checkPrice(); }, [checkPrice, totalPrice]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		checkPrice();
		if (!warning) {
			await new Promise(resolve => setTimeout(resolve, 0));
			navigate('/order-status');
		}
	}

	return (
		<div>
			<h1 className={styles.assetTitle}>Asset List</h1>
			<div className={styles.box}>
				<div className={styles.boxLeft}>
					<p>Please select items to your cart.</p>
					{warning && <p style={{ color: "orangered" }}>{warning}</p>}
					{!warning && <p>&nbsp;</p>}
				</div>
				<div className={styles.boxRight}>
					<p>Total Price: ${ totalPrice.toFixed(2) }</p>
					<p style={{ color: totalPrice > MAX_AMOUNT ? "orangered" : "inherit" }}>
						Maximum Allowed: ${ MAX_AMOUNT.toFixed(2) }</p>
				</div>
			</div>
			<div className={styles.cartTableWrapper}>
				<div className={styles.tableColumn}>
					<table>
						<thead>
						<tr>
							<th><input
								type="checkbox"
								checked={selectAll}
								onChange={toggleAllItemsHandler}
							></input></th>
							<th>IMAGE</th><th>NAME</th><th>CATEGORY</th>
							<th>DESCRIPTION</th><th>REVIEW</th><th>PRICE</th><th>ACTION</th>
						</tr>
						</thead>
						<tbody >
						{itemList.map(item => (
							<CartItem
								key={item.a_id}
								item={item}
								toggleItemHandler={toggleItemHandler}
							/>
						))}
						</tbody>
					</table>
				</div>
			</div>
			<div className={styles.cartTail}>
				<button type="submit" onClick={toggleAllItemsHandler}
						className={selectAll ? styles.btn2 : styles.btn1}>
					{selectAll ? 'Remove' : 'Add'} All Items</button>
				<button type="submit" onClick={handleSubmit}>PLACE ORDER</button>
			</div>
		</div>
	);
}

export default Cart;
