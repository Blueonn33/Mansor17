import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { LandingPage } from './components/LandingPage/LandingPage';
import TaskGroupsComponent from "./components/TaskGroupsComponent/TaskGroupsComponent";

const AppRoutes = [
    {
        index: true,
        element: <LandingPage />
    },
    {
        path: '/taskGroups',
        element: <TaskGroupsComponent />
    },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
