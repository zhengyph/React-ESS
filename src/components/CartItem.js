import renderStars from "./SetStars";
import styles from '../assets/css/styles.module.css';


function CartItem({item, toggleItemHandler}) {
	return (
		<tr>
			<td>
				<input type="checkbox" checked={item.is_selected}
					   onChange={() => {toggleItemHandler(item)}}/>
			</td>
			<td>{
				<img src={item.a_logo.path} alt={item.a_logo.alt}
					 width={item.a_logo.width} height={item.a_logo.height}/>
			}</td>
			<td>{item.a_brand}</td>
			<td>{item.a_category}</td>
			<td>
				{Object.keys(item.a_description).map(key => {return (
					<ul key={key} className={styles.description}>
						{key}: {item.a_description[key]}
					</ul>
				);})}
			</td>
			<td>
				<p>{renderStars(item.a_reviews)}</p>
				<p>{item.a_reviews}</p>
			</td>
			<td>${item.a_price}</td>
			<td>
				<button onClick={() => {toggleItemHandler(item)}}
						className={item.is_selected ? styles.btn2 : styles.btn1}>
					{item.is_selected ? 'Remove from Cart' : 'Add to Cart'}
				</button>
			</td>
		</tr>
	);
}

export default CartItem;
