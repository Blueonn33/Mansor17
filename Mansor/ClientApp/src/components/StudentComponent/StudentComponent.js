import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../StudentComponent/StudentComponent.css';
import { AddStudent } from '../AddStudent/AddStudent';
import StudentContainer from '../StudentContainer/StudentContainer';
import authService from '../api-authorization/AuthorizeService';

export default class StudentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: [],
            specialityId: '',
            currentSpecialityName: '',
            specialityData: undefined,
            specialityHeaderName: '',
            studentData: undefined,
            currentStudentValue: '',
        }
        this.loadStudents = this.loadStudents.bind(this);
    }

    async componentDidMount() {
        this.loadStudents();
        this.getSpecialityName();
    }

    getSpecialityName = async (specialityId) => {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        specialityId = splittedURL[splittedURL.length - 1]
        this.state.specialityId = specialityId
        await fetch(endpoints.getSpecialityName(specialityId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(async (res) => {
                let specialityData = await res.json()
                this.setState({ 'specialityData': specialityData })
                this.setState({ 'currentSpecialityName': specialityData.name })
                this.setState({ 'specialityHeaderName': specialityData.name })
            }
            )
    }

    deleteSpeciality = async (specialityId) => {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        specialityId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.deleteSpeciality(specialityId), {
            method: 'DELETE',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Resource deleted successfully');
            })
            .catch(error => {
                console.error('There was a problem deleting the resource:', error);
            });
        window.location.pathname = '/specialities'
    }

    async loadStudents(specialityId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        specialityId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/students/${specialityId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ students: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='studentsListWrapper d-flex justify-content-center align-items-center'>
                <div className='studentsContainer'>
                    <div className='studentsContent'>
                        <div className='deleteSpecialityButtonWrapper ml-auto'>
                            <button className='deleteStudentButton' onClick={this.deleteSpeciality}>Изтрий</button>
                            <button className='editButton'>
                                <a href={`https://localhost:44414/editSpeciality/${this.state.specialityId}`} id="edit-text">Редактирай</a>
                            </button>
                        </div>
                        <div className='studentsListHeaderWrapper d-flex'>
                            <h4 className='studentsListHeader'>{this.state.specialityHeaderName}</h4>
                        </div>
                        <div className='createNewStudentButtonWrapper'>
                            <AddStudent onStudentAdded={this.loadStudents} />
                        </div>
                        <div className='studentsContainers'>
                            {this.state.students.map((student) => {
                                return (
                                    <StudentContainer studentData={student} key={student.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}