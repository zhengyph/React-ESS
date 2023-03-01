import styles from "../assets/css/styles.module.css";


function OrderItem({item}) {
	return (
		<tr>
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
			<td>{item.a_reviews}</td>
			<td>${item.a_price}</td>
		</tr>
	);
}

export default OrderItem;
