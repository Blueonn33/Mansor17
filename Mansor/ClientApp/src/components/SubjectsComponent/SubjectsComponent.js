import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddSubject } from '../AddSubject/AddSubject';
import SubjectsContainer from '../SubjectsContainer/SubjectsContainer';
import '../SubjectsComponent/SubjectsComponent.css';

export default class SubjectsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { timeTableItems: [] }
        this.loadSubjects = this.loadSubjects.bind(this);
    }
    async componentDidMount() {
        this.loadSubjects();
    }
    async loadSubjects(timeTableDayId) {
        let splittedURL = window.location.pathname.split('/')
        timeTableDayId = splittedURL[splittedURL.length - 1]
        let url = endpoints.loadSubjects(timeTableDayId);
        fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({ timeTableItems: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='subjectsListWrapper d-flex justify-content-center align-items-center'>
                <div className='subjectsContainer'>
                    <div className='createSubjectsButtonWrapper'>
                        <AddSubject onSubjectAdded={this.loadSubjects} />
                    </div>
                    <div className='subjectsContent'>
                        <div className='subjectsContainers'>
                            {this.state.timeTableItems.map((timeTableItem) => {
                                return (
                                    <SubjectsContainer timeTableItemData={timeTableItem} key={timeTableItem.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}