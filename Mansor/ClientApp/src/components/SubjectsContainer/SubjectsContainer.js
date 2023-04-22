//import React, { Component } from 'react'
//import { endpoints } from '../../endpoints';
//import '../SubjectsContainer/SubjectsContainer.css';
//import authService from '../api-authorization/AuthorizeService';

//export default class SubjectsContainer extends Component {
//    async deleteSubject(subjectId) {
//        const token = await authService.getAccessToken();
//        await fetch(endpoints.deleteSubject(subjectId), {
//            method: 'DELETE',
//            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
//        })
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Network response was not ok');
//                }
//                console.log('Resource deleted successfully');
//            })
//            .catch(error => {
//                console.error('There was a problem deleting the resource:', error);
//            });
//        window.location.reload();
//    }

//    render() {
//        return (
//            <div className='subjectsContainer d-flex' key={this.props.subjectData.id}>
//                <div className='subjectNameWrapper'>
//                    <span className='subjectName pageText'> {this.props.subjectData.name} </span>
//                    <span className='durationName pageText'> {this.props.subjectData.duration} </span>
//                </div>
//                <div className='deleteSubjectButtonWrapper ml-auto'>
//                    <button className='deleteSubjectButton' onClick={() => this.deleteSubject(this.props.subjectData.id)}>
//                        Изтрий
//                    </button>
//                </div>
//            </div>
//        )
//    }
//}
