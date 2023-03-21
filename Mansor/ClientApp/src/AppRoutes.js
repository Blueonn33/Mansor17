import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { LandingPage } from './components/LandingPage/LandingPage';
import TaskGroupsComponent from "./components/TaskGroupsComponent/TaskGroupsComponent";
import TasksComponent from "./components/TasksComponent/TasksComponent";
import Notes from "./components/Notes/Notes";
import { NotesComponent } from "./components/NotesComponent/NotesComponent";
import { TasksCalendar } from "./components/TasksCalendar/TasksCalendar";

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
        path: '/taskItems/:id',
        element: <TasksComponent />
    },
    {
        path: '/notes',
        element: <Notes />
    },
    {
        path: '/addNote',
        element: <NotesComponent />
    },
    {
        path: '/calendar',
        element: <TasksCalendar />
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
