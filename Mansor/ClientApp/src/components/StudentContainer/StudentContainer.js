import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../StudentContainer/StudentContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class StudentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    async componentDidMount(specialityId) {
        const token = await authService.getAccessToken();
        fetch(endpoints.loadStudents(specialityId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
        this.render();
    }

    async removeStudent(studentId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.removeStudent(studentId), {
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
        window.location.reload();
    }

    render() {
        return (
            <div className='studentsContainer d-flex' key={this.props.studentData.id}>
                <div className='studentNameWrapper'>
                    <span className='studentName pageText' > {this.props.studentData.name} </span>
                    <hr id="studentLine"></hr>
                </div>
                <div className='markStudentButtonWrapper ml-auto'>
                    <button className='markStudent'>
                        <a href={`https://localhost:44414/typeOfGrade/${this.props.studentData.id}`}
                            className="markStudentText">Оцени</a>
                    </button>
                </div>
                <div className="removeStudentButtonWrapper ml-auto">
                    <button className="removeStudent" onClick={() => this.removeStudent(this.props.studentData.id)}>
                        Премахни
                    </button>
                </div>
            </div>
        )
    }
}
