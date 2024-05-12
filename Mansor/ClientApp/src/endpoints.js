const apiBaseUrl = 'https://localhost:7043'
export const endpoints = {
    loadTaskGroups: (semesterId) => `${apiBaseUrl}/api/taskGroups/${semesterId}`,
    getTaskGroupName: (taskGroupId) => `${apiBaseUrl}/api/taskGroup/${taskGroupId}`,
    deleteTaskGroup: (taskGroupId) => `${apiBaseUrl}/api/delete/taskGroup/${taskGroupId}`,
    editTaskGroup: (taskGroupId) => `${apiBaseUrl}/api/edit/taskGroup/${taskGroupId}`,
    createTaskGroup: (semesterId) => `${apiBaseUrl}/api/create/taskGroup/${semesterId}`,

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

    loadStudents: (specialityId) => `${apiBaseUrl}/api/students/${specialityId}`,
    createStudent: (specialityId) => `${apiBaseUrl}/api/create/student/${specialityId}`,
    removeStudent: (studentId) => `${apiBaseUrl}/api/delete/student/${studentId}`,
    editStudent: (studentId) => `${apiBaseUrl}/api/edit/student/${studentId}`,

    loadCourses: (specialityId) => `${apiBaseUrl}/api/courses/${specialityId}`,
    createCourse: (specialityId) => `${apiBaseUrl}/api/create/course/${specialityId}`,

    loadSemesters: (courseId) => `${apiBaseUrl}/api/semesters/${courseId}`,
    createSemester: (courseId) => `${apiBaseUrl}/api/create/semester/${courseId}`,

    loadLiteratures: (taskGroupId) => `${apiBaseUrl}/api/literatures/${taskGroupId}`,
    createLiterature: (taskGroupId) => `${apiBaseUrl}/api/create/literature/${taskGroupId}`,
    deleteLiterature: (literatureId) => `${apiBaseUrl}/api/delete/literature/${literatureId}`,

    loadGrades: (taskGroupId) => `${apiBaseUrl}/api/grades/${taskGroupId}`,
    createGrade: (taskGroupId) => `${apiBaseUrl}/api/create/grade/${taskGroupId}`,
}
