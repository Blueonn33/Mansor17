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
            //sum: '',
            //counter: ''
        }
        this.loadGrades = this.loadGrades.bind(this);
    }

    async componentDidMount() {
        this.loadGrades();
        //this.getAverage();
    }

    async loadGrades() {
        const token = await authService.getAccessToken();
        //let splittedURL = window.location.pathname.split('/')
        //taskGroupId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/grades`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ grades: res }))
            .catch(error => console.error(error));
    }

    //getAverage() {
    //    this.setState({ sum: 0 });
    //    this.setState({ counter: 0 });

    //    let temp = this.state.sum;
    //    let count = this.state.counter;
    //    let value = this.state.grades.value;

    //    while (value !== '') {
    //        temp += value + 1;
    //        count++;
    //    }

    //    this.setState({ sum: temp / count });
    //    console.log(this.state.sum);
    ////}

    render() {
        return (
            <div className='gradesListWrapper d-flex justify-content-center align-items-center'>
                <div className='gradesContainer'>
                    <div className='gradesContent'>
                        <div className='gradesListHeaderWrapper d-flex'>
                            <h4 className='gradesListHeader'>Оценки</h4>
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
                        {/*<div className='gradeAverageValueWrapper'>*/}
                        {/*    <span className='gradeAverageValue pageText' > {this.state.sum} </span>*/}
                        {/*</div>*/}
                    </div>
                    
                    <div id="snackbar">Въведете текст в полето</div>
                 </div>
            </div>
        );
    }
}