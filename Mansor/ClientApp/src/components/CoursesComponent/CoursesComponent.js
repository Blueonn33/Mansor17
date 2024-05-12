import React, { Component } from 'react';
import '../../custom.css';
import './CoursesComponent.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';
import CoursesContainer from '../CoursesContainer/CoursesContainer';
import { AddCourse } from '../AddCourse/AddCourse';

export class CoursesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: [],
            courseData: undefined,
        }
        this.loadCourses = this.loadCourses.bind(this);
    }
    async componentDidMount() {
        this.loadCourses();
    }
    async loadCourses(specialityId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        specialityId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/courses/${specialityId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ course: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className="coursesContainer">
                <div className="coursesHeader">
                    <h3 className="coursesHeaderName">Курсове</h3>
                </div>

                <div className='createNewCourse'>
                    <AddCourse onCourseAdded={this.loadCourses} />
                </div>
                <div className="showCourses">
                    {this.state.course.map((course) => {
                        return (
                            <CoursesContainer courseData={course} key={course.id} />
                        )
                    })}
                </div>
            </div>
        );
    }
}
