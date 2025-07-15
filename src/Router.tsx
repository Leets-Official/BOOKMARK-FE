import { createBrowserRouter } from 'react-router-dom';
import { Home, Search, Save, Example } from '@/pages';
import App from '@/App';

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
        path: 'save',
        element: <Save />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'example',
        element: <Example />,
      },
    ],
  },
]);

export default router;
