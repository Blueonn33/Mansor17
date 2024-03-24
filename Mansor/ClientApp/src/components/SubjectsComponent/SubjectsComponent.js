import React, { Component } from 'react'
import { AddSubject } from '../AddSubject/AddSubject';
import '../SubjectsComponent/SubjectsComponent.css';

export default class SubjectsComponent extends Component {

    render() {
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='createSubjectsButtonWrapper'>
                        <AddSubject onSubjectAdded={this.loadSubjects} />
                    </div>
                    <button className='subjectsTableBtn'>
                        <a href={`https://localhost:44414/subjects`} className='subjectsTableBtnText'>Програма</a>
                    </button>
                </div>
            </div>
        );
    }
}