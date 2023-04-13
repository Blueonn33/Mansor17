import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../UserSubjects/UserSubjects.css';
import authService from '../api-authorization/AuthorizeService';
import UserSubjectsContainer from '../UserSubjectsContainer/UserSubjectsContainer';

export default class UserSubjects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: [],
        }
        this.loadSubjects = this.loadSubjects.bind(this);
    }
    async componentDidMount() {
        this.loadSubjects();
    }
    //async loadUserSubjects() {
    //    const token = await authService.getAccessToken();
    //    await fetch(endpoints.loadUserSubjects(), {
    //        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //    })
    //        .then((res) => res.json())
    //        .then((res) => this.setState({ subjects: res }))
    //        .catch(error => console.error(error));
    //}

    async loadSubjects(dayId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        dayId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.loadSubjects(dayId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ subjects: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='subjectsContent'>
                        <h3>Предмети</h3>
                        <div className='subjectsContainers'>
                            {this.state.subjects.map((subject) => {
                                return (
                                    <UserSubjectsContainer subjectData={subject} key={subject.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}