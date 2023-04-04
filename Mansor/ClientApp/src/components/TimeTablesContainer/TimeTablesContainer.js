import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TimeTablesContainer/TimeTablesContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class TimeTablesContainer extends Component {

    async deleteDay(timeTableDayId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteDay(timeTableDayId), {
            method: 'DELETE',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Resource deleted successfully');
            })
            .catch(error => {
                console.error('There was a problem deleting the resource:', error);
            });
        window.location.reload();
    }

    render() {
        return (
            <div className='daysContainer d-flex' key={this.props.timeTableDayData.id}>
                <div className='dayNameWrapper'>
                    <span className='dayName pageText'> {this.props.timeTableDayData.name} </span>
                </div>
                <div className='useDayButtonWrapper ml-auto'>
                    <a href={`https://localhost:44414/subjects/${this.props.timeTableDayData.id}`} className='showButtonText'>Добави</a>
                </div>
                <div className='deleteDayButtonWrapper ml-auto'>
                    <button className="deleteDay" onClick={() => this.deleteDay(this.props.timeTableDayData.id)}>Изтрий</button>
                </div>
            </div>
        )
    }
}
