import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddDay } from '../AddDay/AddDay';
import '../TimeTablesComponent/TimeTablesComponent.css';
import TimeTablesContainer from '../TimeTablesContainer/TimeTablesContainer';

export default class TimeTablesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { timeTableDays: [] }
        this.loadDays = this.loadDays.bind(this);
    }
    async componentDidMount() {
        this.loadDays();
    }

    async loadDays() {
        let url = endpoints.loadDays();
        fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({ timeTableDays: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='timeTablesListWrapper d-flex justify-content-center align-items-center'>
                <div className='timeTablesContainer'>
                    <div className='timeTablesContent'>
                        <div className='timeTablesListHeaderWrapper d-flex'>
                            <h4 className='timeTablesListHeader'>Учебна програма</h4>
                        </div>
                        <div className='createNewTimeTableButtonWrapper'>
                            <AddDay onDayAdded={this.loadDays} />
                        </div>
                        <div className='timeTablesContainers'>
                            {this.state.timeTableDays.map((timeTableDay) => {
                                return (
                                    <TimeTablesContainer timeTableDayData={timeTableDay} key={timeTableDay.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}