import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddTypeOfGrade } from '../AddTypeOfGrade/AddTypeOfGrade.js';
import '../TypeOfGradeComponent/TypeOfGradeComponent.css';
import TypeOfGradeContainer from '../TypeOfGradeContainer/TypeOfGradeContainer';
import authService from '../api-authorization/AuthorizeService';

export default class TypeOfGradeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeOfGrades: [],
            typeOfGradeData: undefined,
        }
        this.loadTypeOfGrades = this.loadTypeOfGrades.bind(this);
    }
    async componentDidMount() {
        this.loadTypeOfGrades();
    }
    async loadTypeOfGrades(studentId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        studentId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/typeOfGrades/${studentId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ typeOfGrades: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='typeOfGradesListWrapper d-flex justify-content-center align-items-center'>
               
                <div className='typeOfGradesContainer'>
                    <div className='typeOfGradesContent'>
                        <div className='typeOfGradesListHeaderWrapper d-flex'>
                            <h4 className='typeOfGradesListHeader'>Тип на оценката</h4>
                        </div>
                        <div className='createNewTypeOfGradeButtonWrapper'>
                            <AddTypeOfGrade onTypeOfGradeAdded={this.loadTypeOfGradesData} />
                        </div>
                        <div className='typeOfGradesContainers'>
                            {this.state.typeOfGrades.map((typeOfGrade) => {
                                return (
                                    <TypeOfGradeContainer typeOfGradeData={typeOfGrade} key={typeOfGrade.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}