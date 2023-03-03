import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddress, setContact, setDepartment, setProvince } from "../store/slices/profileSlice";
import styles from "../assets/css/styles.module.css";


function ProfileEdit() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		province: '', department: '', address: '', contact: ''
	});

	const [formErrors, setFormErrors] = useState({
		province: '', department: '', address: '', contact: ''
	});

	const [hasInput, setHasInput] = useState({
		province: false, department: false, address: false, contact: false
	});

	function validateFormField(name, value) {
		const errorMessages = {
			address: {
				required: 'Address is required',
				invalid1: 'You have exceeded the maximum input limit of 100 characters',
				invalid2: 'Please provide a valid address with alphanumeric characters'
			},
			contact: {
				required: 'Contact number is required',
				invalid: 'Please provide a valid contact number'
			},
			department: { required: 'Department is required' },
			province: { required: 'Province is required' }
		}

		switch (name) {
			case 'address':
				if (value.trim() === '') {
					return errorMessages.address.required;
				} else if (value.length > 100) {
					return errorMessages.address.invalid1;
				} else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\s)/.test(value)) {
					return errorMessages.address.invalid2;
				}
				break;
			case 'contact':
				if (value.trim() === '') {
					return errorMessages.contact.required;
				} else if (!/^\d+$/.test(value) || value.length !== 10) {
					return errorMessages.contact.invalid;
				}
				break;
			case 'department':
				if (!value) {
					return errorMessages.department.required;
				}
				break;
			case 'province':
				if (!value) {
					return errorMessages.province.required;
				}
				break;
			default:
				return '';
		}
		return '';
	}

	useEffect(() => {
		const errors = {};
		if (hasInput.address) {
			errors.address = validateFormField('address', formData.address);
		}
		if (hasInput.contact) {
			errors.contact = validateFormField('contact', formData.contact);
		}
		if (hasInput.province) {
			errors.province = validateFormField('province', formData.province);
		}
		if (hasInput.department) {
			errors.department = validateFormField('department', formData.department);
		}
		setFormErrors(errors);
	}, [formData, hasInput]);

	const handleInput = (event) => {
		const { name, value } = event.target;
		const errors = validateFormField(name, value);
		setFormData(prevData => ({ ...prevData, [name]: value }));
		setFormErrors(prevErrors => ({ ...prevErrors, [name]: errors }));
		setHasInput(prevHasInput => ({ ...prevHasInput, [name]: true }));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const errors = {
			address: validateFormField('address', formData.address),
			contact: validateFormField('contact', formData.contact),
			province: validateFormField('province', formData.province),
			department: validateFormField('department', formData.department)
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
