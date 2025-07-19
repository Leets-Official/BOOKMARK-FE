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
        children: [
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
