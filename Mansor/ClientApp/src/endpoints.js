const apiBaseUrl = 'https://localhost:7043'
export const endpoints = {
    loadTaskGroups: () => `${apiBaseUrl}/api/taskGroups`,
    getTaskGroupName: (taskGroupId) => `${apiBaseUrl}/api/taskGroup/${taskGroupId}`,
    deleteTaskGroup: (taskGroupId) => `${apiBaseUrl}/api/delete/taskGroup/${taskGroupId}`,
    editTaskGroup: (taskGroupId) => `${apiBaseUrl}/api/edit/taskGroup/${taskGroupId}`,
    createTaskGroup: () => `${apiBaseUrl}/api/create/taskGroup`,

    loadTaskItems: (taskGroupId) => `${apiBaseUrl}/api/taskItems/${taskGroupId}`,
    createTaskItem: (taskGroupId) => `${apiBaseUrl}/api/create/taskItem/${taskGroupId}`,
    completeTask: (taskItemId) => `${apiBaseUrl}/api/delete/taskItem/${taskItemId}`,
    editTaskItem: (taskItemId) => `${apiBaseUrl}/api/edit/taskItem/${taskItemId}`,
    getTaskItemColor: (taskItemId) => `${apiBaseUrl}/api/taskItem/${taskItemId}`,

    loadNotes: () => `${apiBaseUrl}/api/notes`,
    createNote: () => `${apiBaseUrl}/api/create/note`,
    deleteNote: (noteId) => `${apiBaseUrl}/api/delete/note/${noteId}`,

    loadDays: () => `${apiBaseUrl}/api/days`,
    createDay: () => `${apiBaseUrl}/api/create/day`,
    deleteDay: (dayId) => `${apiBaseUrl}/api/delete/day/${dayId}`,

    loadSubjects: () => `${apiBaseUrl}/api/subjects`,
    createSubject: (dayId) => `${apiBaseUrl}/api/create/subject/${dayId}`,
    deleteSubject: (subjectId) => `${apiBaseUrl}/api/delete/subject/${subjectId}`,

    getUsers: () => `${apiBaseUrl}/api/users`,
    getUserName: () => `${apiBaseUrl}/api/user`,

    loadSpecialities: () => `${apiBaseUrl}/api/specialities`,
    getSpecialityName: (specialityId) => `${apiBaseUrl}/api/speciality/${specialityId}`,
    deleteSpeciality: (specialityId) => `${apiBaseUrl}/api/delete/speciality/${specialityId}`,
    editSpeciality: (specialityId) => `${apiBaseUrl}/api/edit/speciality/${specialityId}`,
    createSpeciality: () => `${apiBaseUrl}/api/create/speciality`,
}
