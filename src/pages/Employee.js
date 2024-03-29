import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/styles.module.css';


function Employee() {

	const navigate = useNavigate();
	const employeeInfo = useSelector(state => state.profile_slice);
	const NAMES = ["First Name", "Last Name", "Date of Birth", "Address",
		"Province", "Country", "Contact Number", "Department", "Role"];

	const handleSubmitProfileUpdate = async (event) => {
		event.preventDefault();
		await new Promise(resolve => setTimeout(resolve, 0));
		navigate('edit');
	}

	const handleSubmitCart = async (event) => {
		event.preventDefault();
		await new Promise(resolve => setTimeout(resolve, 0));
		navigate('/cart');
	}

	return (
		<form className={styles.employeeBox}>
			<h1>About Yourself</h1>
			<div>
				<table>
					<tbody>
					{Object.keys(employeeInfo).map((key, i) => {return (
						<tr key={i}>
							<td className={styles.empLeftText}>{NAMES[i]}</td>
							<td className={styles.empRightText}>{employeeInfo[key]}</td>
						</tr>
					)})}
					</tbody>
				</table>
			</div>
			<div className={styles.employeeBtn}>
				<button onClick={handleSubmitProfileUpdate}>Edit Profile</button>
				<button onClick={handleSubmitCart}>Select Assets</button>
			</div>
		</form>
	);
}

export default Employee;
