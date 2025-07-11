import { createBrowserRouter } from 'react-router-dom';
import { Home, Search, SignUp, Save } from './pages';
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
      {
        path: 'save',
        element: <Save />,
      },
    ],
  },
]);

export default router;
