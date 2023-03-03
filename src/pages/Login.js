import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, signIn } from '../store/slices/loginSlice';
import styles from '../assets/css/styles.module.css'


function Login() {

	/* 点击按钮，检查表单然后发送请求 */
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/* 给用户选择是否将登录信息保存在本地 */
	const [rememberMe, setRememberMe] = useState(false);

	/* 用于设置并生成表单内容 */
	const [formData, setFormData] = useState({ email: '', password: '' });

	/* 用于设置并生成表单规范错误信息 */
	const [formErrors, setFormErrors] = useState({ email: '', password: '' });

	/* 检查输入框内的邮箱或密码文本是否合法 */
	function validateFormField(name, value) {
		const errorMessages = {
			email: {
				required: 'Email is required',
				invalid: 'Your email is invalid',
			},
			password: {
				required: 'Password is required',
				invalid: 'Your password must be at least 6 characters',
			}
		};

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

	/**
	 * useEffect: 监听表单数据的变化，并在表单数据变化时更新表单错误信息的状态。
	 * 通过监听 formData 的变化来调用表单验证函数 validateForm，并将验证结果更新到 formErrors 状态中。
	 */
	useEffect(() => {
		/**
		 * 当初次进入或刷新页面时，formData 的值为空，所以不会进行错误检查。
		 * 只有在用户开始输入时，formData 中的值才会发生变化，从而触发这部分代码，进行错误检查并更新错误信息状态。
		 */
		if (formData.email || formData.password) {
			const errors = {
				email: validateFormField('email', formData.email),
				password: validateFormField('password', formData.password)
			};
			setFormErrors(errors);
		}
	}, [formData]);

	/**
	 * 通过监听 onBlur 事件，在用户离开输入框时进行检查，通过监听 onChange 事件来保存输入的文本。
	 * 通过监听 onBlur 事件来调用表单验证函数 validateFormField，并将验证结果更新到 formErrors 状态中。
	 */
	const handleInput = (event) => {
		const { name, value } = event.target;
		const errors = validateFormField(name, value);
		setFormData(prevData => ({ ...prevData, [name]: value }));
		setFormErrors(prevErrors => ({ ...prevErrors, [name]: errors }));
	}

	/**
	 * handleSubmit 函数在用户点击按钮时进行检查和发送请求。
	 * dispatch 向 store 分发 actions，告诉 Redux 去执行这些 actions。
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		const errors = {
			email: validateFormField('email', formData.email),
			password: validateFormField('password', formData.password)
		};
		setFormErrors(errors); // 确保在提交操作之前将表单的错误信息保存在组件的状态中

		/* 如果错误信息 errors 里每个 key 的 value 都为空，则进行跳转 */
		if (Object.values(errors).every(value => value === '')) {
			/* 用于更新 store 中的 email 属性和 password 属性 */
			dispatch(setEmail(formData.email));
			dispatch(setPassword(formData.password));

			/* 将 store 中的 isSignedIn 属性设置为 true */
			dispatch(signIn());

			/* 选择是否将登录信息保存在本地 */
			if (rememberMe) {
				localStorage.setItem('is_signed_in', 'true');
			} else {
				localStorage.removeItem('is_signed_in');
			}

			/* 先等待当前执行栈中的任务完成，再执行跳转 */
			await new Promise(resolve => setTimeout(resolve, 0));
			navigate('/complete-your-profile');
		}
	}

	return (
		<form className={styles.loginBox} onSubmit={handleSubmit}>
			<h1>Welcome to ESS</h1>
			<div>
				<input type="text" name="email" placeholder="email"
					   autoComplete="off" value={formData.email}
					   onBlur={handleInput} onChange={handleInput}/>
			</div>
			<div className={styles["error-message"]}>
				{formErrors.email ? formErrors.email : <br/>}
			</div>
			<div>
				<input type="password" name="password" placeholder="password"
					   autoComplete="off" value={formData.password}
					   onBlur={handleInput} onChange={handleInput}/>
			</div>
			<div className={styles["error-message"]}>
				{formErrors.password ? formErrors.password : <br/>}
			</div>
			<div className={styles.storeLoginInfo}>
				<div>
					<input
						type="checkbox" checked={rememberMe}
						onChange={event => setRememberMe(event.target.checked)}/>
					<span>Remember Me</span>
				</div>
				<button className={styles.loginButton} type="submit">SIGN IN</button>
			</div>
		</form>
	)
}

export default Login;
