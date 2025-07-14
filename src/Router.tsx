import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Search, SignUp } from './pages';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);

export default router;
