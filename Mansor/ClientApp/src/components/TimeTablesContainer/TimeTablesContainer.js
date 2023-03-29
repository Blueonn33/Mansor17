import React, { Component } from 'react'
import SubjectsComponent from '../SubjectsComponent/SubjectsComponent';
import '../TimeTablesContainer/TimeTablesContainer.css';

export default class TimeTablesContainer extends Component {

    render() {
        return (
            <div className='daysContainer d-flex' key={this.props.timeTableDayData.id}>
                <div className='dayNameWrapper'>
                    <span className='dayName pageText'> {this.props.timeTableDayData.name} </span>
                </div>
                <div className='useDayButtonWrapper ml-auto'>
                    <a href={`https://localhost:44414/subjects/${this.props.timeTableDayData.id}`} className='showButtonText'>Добави</a>
                </div>
            </div>
        )
    }
}
