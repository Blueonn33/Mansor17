import React, { Component } from 'react'
import '../GradesComponent/GradesComponent.css';
import { AddGrade } from '../AddGrade/AddGrade';
import GradesContainer from '../GradesContainer/GradesContainer';
import authService from '../api-authorization/AuthorizeService';

export default class GradesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grades: [],
            typeOfGradeId: '',
            typeOfGradeData: undefined,
            typeOfGradeHeaderName: '',
            gradeData: undefined,
            currentGradeValue: '',
        }
        this.loadGrades = this.loadGrades.bind(this);
    }

    async componentDidMount() {
        this.loadGrades();
    }

    async loadGrades(typeOfGradeId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        typeOfGradeId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/grades/${typeOfGradeId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ grades: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='gradesListWrapper d-flex justify-content-center align-items-center'>
                <div className='gradesContainer'>
                    <div className='gradesContent'>
                        <div className='gradesListHeaderWrapper d-flex'>
                            <h4 className='gradesListHeader'>{this.state.typeOfGradeHeaderName}</h4>
                        </div>
                        <div className='createNewGradeItemButtonWrapper'>
                            <AddGrade onGradeAdded={this.loadGrades} />
                        </div>
                        <div className='gradesContainers'>
                            {this.state.grades.map((grade) => {
                                return (
                                    <GradesContainer gradeData={grade} key={grade.id} />
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