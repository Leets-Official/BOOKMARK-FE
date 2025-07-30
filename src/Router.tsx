import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Login,
  Search,
  Save,
  Example,
  SearchResult,
  KakaoCallBack,
  MyPageContainer,
  MyPage,
  ProfileEdit,
  CategoryManagement,
  Inquiry,
} from '@/pages';
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
            element: <Save type='create' />,
          },
          {
            path: 'edit/:id',
            element: <Save type='edit' />,
          },
          {
            path: 'my-page',
            element: <MyPageContainer />,
            children: [
              {
                path: '',
                element: <MyPage />,
              },
              {
                path: 'profile-edit',
                element: <ProfileEdit />,
              },
              {
                path: 'category-management',
                element: <CategoryManagement />,
              },
              {
                path: 'inquiry',
                element: <Inquiry />,
              },
            ],
          },
        ],
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search-result',
        element: <SearchResult />,
        children: [
          {
            path: 'edit/:id',
            element: <Save type='edit' />,
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
