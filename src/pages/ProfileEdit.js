import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateProfileField } from '../components/ValidateField';
import { setAddress, setContact, setDepartment, setProvince } from '../store/slices/profileSlice';
import styles from '../assets/css/styles.module.css';


function ProfileEdit() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const employeeInfo = useSelector(state => state.profile_slice);

	const [formData, setFormData] = useState({
		address: employeeInfo['usr_address'],
		contact: employeeInfo['usr_contact'],
		province: employeeInfo['usr_province'],
		department: employeeInfo['usr_department']
	});

	const [formErrors, setFormErrors] = useState({
		province: '', department: '', address: '', contact: ''
	});

	const [hasInput, setHasInput] = useState({
		province: false, department: false, address: false, contact: false
	});

	useEffect(() => {
		const errors = {};
		if (hasInput.address) {
			errors.address = validateProfileField('address', formData.address);
		}
		if (hasInput.contact) {
			errors.contact = validateProfileField('contact', formData.contact);
		}
		if (hasInput.province) {
			errors.province = validateProfileField('province', formData.province);
		}
		if (hasInput.department) {
			errors.department = validateProfileField('department', formData.department);
		}
		setFormErrors(errors);
	}, [formData, hasInput]);

	const handleInput = (event) => {
		const { name, value } = event.target;
		const errors = validateProfileField(name, value);
		setFormData(prevData => ({ ...prevData, [name]: value }));
		setFormErrors(prevErrors => ({ ...prevErrors, [name]: errors }));
		setHasInput(prevHasInput => ({ ...prevHasInput, [name]: true }));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const errors = {
			address: validateProfileField('address', formData.address),
			contact: validateProfileField('contact', formData.contact),
			province: validateProfileField('province', formData.province),
			department: validateProfileField('department', formData.department)
		};
		setFormErrors(errors);

		if (Object.values(errors).every(value => value === '')) {
			dispatch(setProvince(formData.province));
			dispatch(setDepartment(formData.department));
			dispatch(setAddress(formData.address));
			dispatch(setContact(formData.contact));

			await new Promise(resolve => setTimeout(resolve, 0));
			navigate('/employee');
		}
	}

	return (
		<form className={styles.profileBox} onSubmit={handleSubmit}>
			<h1>Update Profile</h1>
			<div className={styles.updateContainer}>
				<table>
					<tbody>
					<tr><td className={styles.profileLeftText2}>Address</td>
						<td >
							<input type="text" name="address" autoComplete="off"
								   className={styles.profileRightText2}
								   value={formData.address} onChange={handleInput}/>
						</td>
					</tr>
					<tr><td></td>
						<td className={styles.errorMsgProfile}>
							{formErrors.address ? formErrors.address : <br/>}
						</td>
					</tr>
					<tr><td className={styles.profileLeftText2}>Province</td>
						<td>
							<select name="province" value={formData.province} onChange={handleInput}>
								<option defaultValue=""></option>
								<option value="AB">Alberta</option>
								<option value="BC">British Columbia</option>
								<option value="MB">Manitoba</option>
								<option value="NB">New Brunswick</option>
								<option value="NL">Newfoundland and Labrador</option>
								<option value="NS">Nova Scotia</option>
								<option value="ON">Ontario</option>
								<option value="PE">Prince Edward Island</option>
								<option value="QC">Quebec</option>
								<option value="SK">Saskatchewan</option>
								<option value="NT">Northwest Territories</option>
								<option value="NV">Nunavut</option>
								<option value="YK">Yukon</option>
							</select>
						</td>
					</tr>
					<tr><td></td>
						<td className={styles.errorMsgProfile}>
							{formErrors.province ? formErrors.province : <br/>}
						</td>
					</tr>
					<tr><td className={styles.profileLeftText2}>Department</td>
						<td>
							<select name="department" value={formData.department} onChange={handleInput}>
								<option defaultValue="" />
								<option>Sales</option><option>Engineering</option>
								<option>Administration</option><option>Human Resource</option>
								<option>Customer Service</option><option>Technical Support</option>
							</select>
						</td>
					</tr>
					<tr><td></td>
						<td className={styles.errorMsgProfile}>
							{formErrors.department ? formErrors.department : <br/>}
						</td>
					</tr>
					<tr><td className={styles.profileLeftText2}>Contact Number</td>
						<td>
							<input type="tel" name="contact" autoComplete="off"
								   className={styles.profileRightText2}
								   value={formData.contact} onChange={handleInput}/>
						</td>
					</tr>
					<tr><td></td>
						<td className={styles.errorMsgProfile}>
							{formErrors.contact ? formErrors.contact : <br/>}
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<button type="submit">Save Information</button>
		</form>
	);
}

export default ProfileEdit;
