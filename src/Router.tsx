import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Signup, Search, Save, Example, SearchResult } from '@/pages';
import App from '@/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        feat/Login
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
        path: 'save',
        element: <Save />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search-result',
        element: <SearchResult />,
      },
      {
        path: 'example',
        element: <Example />,
      },
    ],
  },
]);

export default router;
