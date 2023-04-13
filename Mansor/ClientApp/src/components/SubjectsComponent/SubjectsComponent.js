import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddSubject } from '../AddSubject/AddSubject';
import SubjectsContainer from '../SubjectsContainer/SubjectsContainer';
import '../SubjectsComponent/SubjectsComponent.css';
import authService from '../api-authorization/AuthorizeService';

export default class SubjectsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: [],
            users: null,
            userId: '',
            dayId: ''
        }
        this.loadSubjects = this.loadSubjects.bind(this);
    }
    async componentDidMount() {
        this.loadSubjects();
    }
    async loadSubjects(dayId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        dayId = splittedURL[splittedURL.length - 1]
        this.state.dayId = dayId;
        //await fetch(endpoints.loadSubjects(dayId), {
        //    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        //})
        //    .then((res) => res.json())
        //    .then((res) => this.setState({ subjects: res }))
        //    .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='createSubjectsButtonWrapper'>
                        <AddSubject onSubjectAdded={this.loadSubjects} />
                    </div>
                    <button className='subjectsBackBtn'>
                        <a href={`https://localhost:44414/subjects/${this.state.dayId}`} className='subjectsBackBtnText'>Работи</a>
                    </button> 
                    {/*<div className='subjectsContent'>*/}
                    {/*    <div className='subjectsContainers'>*/}
                    {/*        {this.state.subjects.map((subject) => {*/}
                    {/*            return (*/}
                    {/*                <SubjectsContainer subjectData={subject} key={subject.id} />*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}