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

    loadNotes: () => `${apiBaseUrl}/api/notes`,
    createNote: () => `${apiBaseUrl}/api/create/note`,
    deleteNote: (noteId) => `${apiBaseUrl}/api/delete/note/${noteId}`,

    loadDays: () => `${apiBaseUrl}/api/days`,
    createDay: () => `${apiBaseUrl}/api/create/day`,
    deleteDay: (dayId) => `${apiBaseUrl}/api/delete/day/${dayId}`,

    loadSubjects: () => `${apiBaseUrl}/api/subjects`,
    loadSubjectsForDay: (dayId) => `${apiBaseUrl}/api/subjects/${dayId}`,
    //loadUserSubjects: () => `${apiBaseUrl}/api/subjects`,
    loadUserSubjects: () => `${apiBaseUrl}/api/userSubjects`,
    createSubject: (dayId) => `${apiBaseUrl}/api/create/subject/${dayId}`,
    deleteSubject: (subjectId) => `${apiBaseUrl}/api/delete/subject/${subjectId}`,

    getUsers: () => `${apiBaseUrl}/api/users`,
    getUser: () => `${apiBaseUrl}/api/user`,
}
