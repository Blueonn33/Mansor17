import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../SubjectsContainer/SubjectsContainer.css';

export default class SubjectsContainer extends Component {

    //deleteSubject = async (timeTableDayId) => {
    //    let splittedURL = window.location.pathname.split('/')
    //    timeTableDayId = splittedURL[splittedURL.length - 1]
    //    await fetch(endpoints.deleteTaskGroup(taskGroupId), {
    //        method: 'DELETE'
    //    })
    //        .then(response => {
    //            if (!response.ok) {
    //                throw new Error('Network response was not ok');
    //            }
    //            console.log('Resource deleted successfully');
    //        })
    //        .catch(error => {
    //            console.error('There was a problem deleting the resource:', error);
    //        });
    //    window.location.pathname = '/taskGroups'
    //}

    deleteSubject(timeTableItemId) {
        fetch(endpoints.deleteSubject(timeTableItemId), {
            method: 'DELETE'
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
                    <span className='timeTableItemName pageText'> {this.props.timeTableItemData.value} </span>
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
