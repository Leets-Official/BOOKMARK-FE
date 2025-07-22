import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Search, Save, Example, SearchResult, Edit } from '@/pages';
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
          {
            path: 'edit',
            element: <Edit />,
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
        children: [
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
      {
        path: 'example',
        element: <Example />,
      },
    ],
  },
]);

export default router;
