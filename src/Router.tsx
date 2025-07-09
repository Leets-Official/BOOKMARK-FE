import { createBrowserRouter } from 'react-router-dom';
import { Home, Search, SignUp } from './pages';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
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
