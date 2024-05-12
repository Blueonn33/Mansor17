import React, { Component } from 'react';
import '../../custom.css';
import './SemesterComponent.css';
import authService from '../api-authorization/AuthorizeService';
import SemestersContainer from '../SemesterContainer/SemesterContainer';
import { AddSemester } from '../AddSemester/AddSemester';

export class SemesterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            semester: [],
            semesterData: undefined,
        }
        this.loadSemesters = this.loadSemesters.bind(this);
    }
    async componentDidMount() {
        this.loadSemesters();
    }
    async loadSemesters(courseId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        courseId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/semesters/${courseId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ semester: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className="semestersContainer">
                <div className="semestersHeader">
                    <h3 className="semestersHeaderName">Семестри</h3>
                </div>

                <div className='createNewSemester'>
                    <AddSemester onSemesterAdded={this.loadSemesters} />
                </div>
                <div className="showSemesters">
                    {this.state.semester.map((semester) => {
                        return (
                            <SemestersContainer semesterData={semester} key={semester.id} />
                        )
                    })}
                </div>
            </div>
        );
    }
}
