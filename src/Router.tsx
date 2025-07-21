import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Search, Save, Example, SearchResult } from '@/pages';
import App from '@/App';

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
            path: 'save',
            element: <Save />,
          },
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
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
