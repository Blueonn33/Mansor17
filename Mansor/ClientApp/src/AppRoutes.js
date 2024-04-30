import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
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
import SpecialityComponent from './components/SpecialityComponent/SpecialityComponent';
import StudentComponent from './components/StudentComponent/StudentComponent';
import TypeOfGradeComponent from './components/TypeOfGradeComponent/TypeOfGradeComponent';
import GradesComponent from './components/GradesComponent/GradesComponent';
import { ScheduleComponent } from './components/ScheduleComponent/ScheduleComponent';
import { Informatics } from './components/Specialities/Informatics';
import { SoftwareEngineering } from './components/Specialities/SoftwareEngineering';
import { CoursesComponent } from './components/CoursesComponent/CoursesComponent';
import { SemesterComponent } from './components/SemesterComponent/SemesterComponent';
import { Pedagogy } from './components/Specialities/Pedagogy';
import { ComputerSciences } from './components/Specialities/ComputerSciences';
import { InformationBrokerage } from './components/Specialities/InformationBrokerage';
import { AppliedMathematics } from './components/Specialities/AppliedMathematics';
import { LiteratureComponent } from './components/LiteratureComponent/LiteratureComponent';

const AppRoutes = [
    {
        index: true,
        element: <LandingPage />
    },
    {
        path: '/specialities',
        element: <SpecialityComponent />
    },
    {
        path: '/students/:id',
        element: <StudentComponent />
    },
    //{
    //    path: '/taskGroups',
    //    element: <TaskGroupsComponent />
    //},
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
        path: '/typeOfGrade/:id',
        element: <TypeOfGradeComponent />
    },
    {
        path: '/grades/:id',
        element: <GradesComponent />
    },
    {
        path: '/schedule',
        element: <ScheduleComponent />
    },
    {
        path: '/informatics',
        element: <Informatics />
    },
    {
        path: '/software_engineering',
        element: <SoftwareEngineering />
    },
    {
        path: '/pedagogy_of_learning_in_mathematics_and_informatics',
        element: <Pedagogy />
    },
    {
        path: '/computer_sciences',
        element: <ComputerSciences />
    },
    {
        path: '/information_brokerage_and_digital_media',
        element: <InformationBrokerage />
    },
    {
        path: '/applied_mathematics',
        element: <AppliedMathematics />
    },
    {
        path: '/subjects',
        element: <UserSubjects />
    },
    {
        path: '/courses/:id',
        element: <CoursesComponent />
    },
    {
        path: '/semesters/:id',
        element: <SemesterComponent />
    },
    {
        path: '/taskGroups/:id',
        element: <TaskGroupsComponent />
    },
    {
        path: '/literatures/:id',
        element: <LiteratureComponent />
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
