import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Search, Save, Example, SearchResult, Edit, KakaoCallBack } from '@/pages';
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
  {
    path: '/login/',
    element: <Login />,
  },
  {
    path: '/auth/login/kakao',
    element: <KakaoCallBack />,
  },
]);

export default router;
