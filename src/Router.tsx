import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Search, Save, Example, SearchResult, Edit } from '@/pages';
import App from '@/App';
import MyPage from './pages/MyPage';

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
          {
            path: 'my-page',
            element: <MyPage />,
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
          {
            path: 'edit',
            element: <Edit />,
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
