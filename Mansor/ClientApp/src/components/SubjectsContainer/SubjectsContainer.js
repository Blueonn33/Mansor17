import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../SubjectsContainer/SubjectsContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class SubjectsContainer extends Component {
    async deleteSubject(timeTableItemId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteSubject(timeTableItemId), {
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
            <div className='timeTableItemsContainer d-flex' key={this.props.timeTableItemData.id}>
                <div className='timeTableItemNameWrapper'>
                    <span className='subjectName pageText'> {this.props.timeTableItemData.value} </span>
                    <span className='durationName pageText'> {this.props.timeTableItemData.duration} </span>
                </div>
                <div className='deleteSubjectButtonWrapper ml-auto'>
                    <button className='deleteSubjectButton' onClick={() => this.deleteSubject(this.props.timeTableItemData.id)}>
                        Изтрий
                    </button>
                </div>
            </div>
        )
    }
}
