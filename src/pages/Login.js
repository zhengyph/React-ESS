import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, signIn } from '../store/slices/loginSlice';
import { validateLoginField }  from "../components/ValidateField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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

	/* 用于追踪是否已经开始输入文本 */
	const [hasInput, setHasInput] = useState({ email: false, password: false });

	/* 控制密码输入框的显示文本格式 */
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	/* 点击切换是否显示密码文本 */
	const togglePasswordVisibility = () => { setIsPasswordVisible(!isPasswordVisible); };

	/**
	 * useEffect: 监听表单数据的变化，并在表单数据变化时更新表单错误信息的状态。
	 * 通过监听 formData 的变化来调用表单验证函数 validateForm，并将验证结果更新到 formErrors 状态中。
	 */
	useEffect(() => {
		/* 储存错误信息 */
		const errors = {};

		/**
		 * 当初次进入或刷新页面时，formData 的值为空，所以不会进行错误检查。
		 * 只有在用户开始输入时，formData 中的值才会发生变化，从而触发这部分代码，进行错误检查并更新错误信息状态。
		 */
		if (hasInput.email) {
			errors.email = validateLoginField('email', formData.email);
		}
		if (hasInput.password) {
			errors.password = validateLoginField('password', formData.password);
		}
		setFormErrors(errors);
	}, [formData, hasInput]);

	/**
	 * 通过监听 onBlur 事件，在用户离开输入框时进行检查，通过监听 onChange 事件来保存输入的文本。
	 * 通过监听 onBlur 事件来调用表单验证函数 validateFormField，并将验证结果更新到 formErrors 状态中。
	 */
	const handleInput = (event) => {
		/**
		 * name = event.target.name
		 * value = event.target.value
		 *
		 * 这里如果写成 setFormData({ ...formData, [name]: value }); 但是用这种方式更新 state，会导致
		 * formData 立即更新为新的值，然后组件重新渲染。这意味着每次调用 setFormData 都会导致组件重新渲染，
		 * 即使新值与旧值完全相同。
		 *
		 * 而使用函数形式，会将 prevData 参数设置为 formData 的当前值，然后返回一个新的对象，该对象包含旧的
		 * formData 的所有属性和新的属性 [name]: value。React 会在下一次渲染时更新 state，而不是立即更新，
		 * 因此可以避免不必要的重新渲染。
		 */
		const { name, value } = event.target;
		const errors = validateLoginField(name, value);
		setFormData(prevData => ({ ...prevData, [name]: value }));
		setFormErrors(prevErrors => ({ ...prevErrors, [name]: errors }));
		setHasInput(prevHasInput => ({ ...prevHasInput, [name]: true }));
	}

	/**
	 * handleSubmit 函数在用户点击按钮时进行检查和发送请求。
	 * dispatch 向 store 分发 actions，告诉 Redux 去执行这些 actions。
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		const errors = {
			email: validateLoginField('email', formData.email),
			password: validateLoginField('password', formData.password)
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
			<div className={styles.errorMsg}>
				{formErrors.email ? formErrors.email : <br/>}
			</div>
			<div>
				<input id="password" type={isPasswordVisible ? 'text' : 'password'}
					   name="password" placeholder="password"
					   autoComplete="off" value={formData.password}
					   onBlur={handleInput} onChange={handleInput}/>
				<FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash}
								 className={styles.eyeIcon} onClick={togglePasswordVisibility}/>

			</div>
			<div className={styles.errorMsg}>
				{formErrors.password ? formErrors.password : <br/>}
			</div>
			<div className={styles.storeLoginInfo}>
				<div>
					<input type="checkbox" checked={rememberMe}
						   onChange={event => setRememberMe(event.target.checked)}/>
					<span>Remember Me</span>
				</div>
				<button className={styles.loginButton} type="submit">SIGN IN</button>
			</div>
		</form>
	)
}

export default Login;
