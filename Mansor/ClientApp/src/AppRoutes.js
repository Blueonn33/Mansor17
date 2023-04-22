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
import TimeTablesComponent from "./components/TimeTablesComponent/TimeTablesComponent";
import SubjectsComponent from './components/SubjectsComponent/SubjectsComponent';
import { EditTaskGroupName } from './components/EditTaskGroupName/EditTaskGroupName';
import UserSubjects from './components/UserSubjects/UserSubjects';
import { EditTaskItemColor } from './components/EditTaskItemColor/EditTaskItemColor';

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
        path: '/editTaskGroup/:id',
        element: <EditTaskGroupName />
    },
    {
        path: '/taskItems/:id',
        element: <TasksComponent />
    },
    {
        path: '/editTaskItem/:id/:id',
        element: <EditTaskItemColor />
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
        path: '/timeTable',
        element: <TimeTablesComponent />
    },
    {
        path: '/add/subject/:id',
        element: <SubjectsComponent />
    },
    {
        path: '/subjects/:id',
        element: <UserSubjects />
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
