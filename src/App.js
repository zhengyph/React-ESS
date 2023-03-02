import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Cart from './pages/Cart';
import Employee from './pages/Employee';
import Login from './pages/Login';
import OrderStatus from './pages/OrderStatus';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import RootLayout from './components/RootLayout';
import myStore from './store/myStore';
import './assets/css/App.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            { path: '', element: <Navigate to="login" replace/> },
            { path: 'login', element: <Login/> },
            { path: 'complete-your-profile', element: <Profile/> },
            { path: 'employee/edit', element: <ProfileEdit/> },
            { path: 'employee', element: <Employee/> },
            { path: 'cart', element: <Cart/> },
            { path: 'order-status', element: <OrderStatus/> }
        ]
    }
]);

function App() {
    return (
        <div>
            <Provider store={myStore}>
                <RouterProvider router={router}>
                    <Login/>
                    <Profile/>
                    <Cart/>
                </RouterProvider>
            </Provider>
        </div>
    );
}

export default App;
