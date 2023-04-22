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

    async loadSubjects() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadSubjects(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ subjects: res }))
            .catch(error => console.error(error));
    }

    render() {
        let splittedURL = window.location.pathname.split('/')
        let taskGroupId = splittedURL[splittedURL.length - 1]
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='subjectsContent'>
                        <div className='subjectsListHeaderWrapper d-flex'>
                            <h4 className='subjectsListHeader'>Предмети</h4>
                        </div>
                        <button className='subjectsBackBtn'>
                            <a href={`https://localhost:44414/add/subject/${taskGroupId}`} className='subjectsBackBtnText'>Назад</a>
                        </button> 
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