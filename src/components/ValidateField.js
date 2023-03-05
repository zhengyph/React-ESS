const errorMessages = {
	email: {
		required: 'Email is required',
		invalid: 'Your email is invalid'
	},
	password: {
		required: 'Password is required',
		invalid: 'Your password must be at least 6 characters'
	},
	address: {
		required: 'Address is required',
		invalid1: 'You have exceeded the maximum input limit of 100 characters',
		invalid2: 'Please provide a valid address with alphanumeric characters'
	},
	contact: {
		required: 'Contact number is required',
		invalid: 'Please provide a valid contact number'
	},
	province: {
		required: 'Province is required'
	},
	department: {
		required: 'Department is required'
	}
}

/* name 和 value 是基本类型的值，而不是对象。因此使用对象解构的方式不适合 */
function validateLoginField(name, value) {
	switch (name) {
		case 'email':
			if (!value.trim()) {
				return errorMessages.email.required;
			} else if (!/\S+@\S+\.\S+/.test(value)) {
				return errorMessages.email.invalid;
			}
			break;
		case 'password':
			if (!value.trim()) {
				return errorMessages.password.required;
			} else if (value.trim().length < 6) {
				return errorMessages.password.invalid;
			}
			break;
		default:
			return '';
	}
	return '';
}

function validateProfileField(name, value) {
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

export { validateLoginField, validateProfileField };
