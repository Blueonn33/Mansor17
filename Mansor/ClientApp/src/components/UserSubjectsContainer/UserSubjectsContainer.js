import React, { Component } from 'react'
import '../UserSubjectsContainer/UserSubjectsContainer.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';

export default class UserSubjectsContainer extends Component {

    async deleteSubject(subjectId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteSubject(subjectId), {
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

    getDayName(dayId) {
        var dayName = '';
        if (dayId === 1) {
            dayName = 'Понеделник';
        }
        else if (dayId === 2) {
            dayName = 'Вторник';
        }
        else if (dayId === 3) {
            dayName = 'Сряда';
        }
        else if (dayId === 4) {
            dayName = 'Четвъртък';
        }
        else if (dayId === 5) {
            dayName = 'Петък';
        }

        return dayName;
    }

    render() {
        return (
            <div className='subjectsContainer d-flex' key={this.props.subjectData.id}>
                <div className="subjectDayContainer">
                    <h6 className='subjectDay pageText'> {this.getDayName(this.props.subjectData.dayId)} </h6>
                </div>
                <div className='subjectNameWrapper'>
                    {/*<span className='dayNumber pageText'> {this.getDayName(this.props.subjectData.dayId)} - </span>*/}
                    <span className='subjectName pageText'> {this.props.subjectData.name} </span>
                    <span className='durationName pageText'> {this.props.subjectData.duration} </span>
                </div>
                <div className='deleteSubjectButtonWrapper ml-auto'>
                    <button className='deleteSubjectButton' onClick={() => this.deleteSubject(this.props.subjectData.id)}>
                        Изтрий
                    </button>
                </div>
            </div>
        )
    }
}
