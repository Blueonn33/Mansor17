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
    createDay: () => `${apiBaseUrl}/api/create/timeTableDay`,

    loadSubjects: (timeTableDayId) => `${apiBaseUrl}/api/subjects/${timeTableDayId}`,
    createSubject: (timeTableDayId) => `${apiBaseUrl}/api/create/subject/${timeTableDayId}`,
    deleteSubject: (timeTableItemId) => `${apiBaseUrl}/api/delete/subject/${timeTableItemId}`,
}
