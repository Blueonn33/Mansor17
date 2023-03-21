﻿const apiBaseUrl = 'https://localhost:7043'
export const endpoints = {
    loadTaskGroups: () => `${apiBaseUrl}/api/taskGroups`,
    getTaskGroupName: (taskGroupId) => `${apiBaseUrl}/api/taskGroup/${taskGroupId}`,
    createTaskGroup: () => `${apiBaseUrl}/api/create/taskGroup`,
    //loadTaskItems: () => `${apiBaseUrl}/api/taskItems`,
    loadTaskItems: (taskGroupId) => `${apiBaseUrl}/api/taskItems/${taskGroupId}`,
    createTaskItem: (taskGroupId) => `${apiBaseUrl}/api/create/taskItem/${taskGroupId}`,
    completeTaskItem: (taskItemId) => `${apiBaseUrl}/api/delete/taskItem/${taskItemId}`,
    loadNotes: () => `${apiBaseUrl}/api/notes`,
    createNote: () => `${apiBaseUrl}/api/create/note`,
    loadDays: () => `${apiBaseUrl}/api/days`,
}
