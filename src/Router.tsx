import { createBrowserRouter } from 'react-router-dom';
import { Home, Search, SignUp } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

export default router;
