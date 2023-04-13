import React, { Component } from 'react'
import '../TimeTablesContainer/TimeTablesContainer.css';

export default class TimeTablesContainer extends Component {

    render() {
        return (
            <div className='daysContainer d-flex' key={this.props.dayData.id}>
                <div className='dayNameWrapper'>
                    <a href={`https://localhost:44414/add/subject/${this.props.dayData.id}`} className='dayName pageText'>
                        {this.props.dayData.name}</a>
                </div>
                {/*<div className='useDayButtonWrapper ml-auto'>*/}
                {/*    <a href={`https://localhost:44414/subjects/${this.props.dayData.id}`} className='showButtonText'>Програма</a>*/}
                {/*</div>*/}
            </div>
        )
    }
}
