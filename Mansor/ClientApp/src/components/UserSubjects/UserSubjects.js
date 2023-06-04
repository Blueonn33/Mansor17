import React, { Component } from 'react'
import '../UserSubjects/UserSubjects.css';
import authService from '../api-authorization/AuthorizeService';
import UserSubjectsContainer from '../UserSubjectsContainer/UserSubjectsContainer';
import { endpoints } from '../../endpoints';

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
        let url = `https://localhost:7043/api/subjects`;
        await fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.setState({ subjects: data })
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='subjectsContent'>
                        <div className='subjectsListHeaderWrapper d-flex'>
                            <h4 className='subjectsListHeader'>Предмети</h4>
                        </div>
                        <button className='subjectsBackBtn'>
                            <a href={`https://localhost:44414/timeTable`} className='subjectsBackBtnText'>Назад</a>
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