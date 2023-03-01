import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signIn, signOut } from '../store/slices/loginSlice';


function RootLayout() {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	/* 获取当前登录状态 */
	const isLoggedIn = useSelector(state => state.login_slice.is_signed_in);

	useEffect(() => {
		/* 获取当前本地储存中是否有登录信息 */
		const isRemembered = localStorage.getItem('is_signed_in');

		/* 检查是否在本地保存了登录信息，然后再更新 login_slice 的状态 */
		if (isRemembered === 'true') {
			dispatch(signIn());
		}

		/* 监听路由变化。如果没有登录且没有储存登录信息在本地，则只允许停留在 login 页面 */
		if (!isLoggedIn && !isRemembered && navigate) {
			navigate('/login', { replace: true });
		}
	}, [dispatch, isLoggedIn, navigate]);

	/* 用于进行登出操作 */
	const handleLogout = () => {
		dispatch(signOut()); // 将 store 中的 isSignedIn 属性设置为 false
		localStorage.removeItem('is_signed_in'); // 删除本地储存的登录信息
	};

	return (
		<div>
			<header>
				<h1>Employee Self Service</h1>
				<nav>
					{isLoggedIn && <NavLink onClick={handleLogout} to="/login">Sign Out</NavLink>}
				</nav>
			</header>
			<main>
				<Outlet/>
			</main>
		</div>
	);
}

export default RootLayout;
