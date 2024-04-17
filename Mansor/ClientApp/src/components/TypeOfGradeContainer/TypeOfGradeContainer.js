import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TypeOfGradeContainer/TypeOfGradeContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class TypeOfDataContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    async componentDidMount(typeOfDataId) {
        const token = await authService.getAccessToken();
        fetch(endpoints.getTypeOfDataColor(typeOfDataId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
        this.render();
    }

    async deleteTypeOfGrade(typeOfGradeId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteTypeOfGrade(typeOfGradeId), {
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
            <div className='typeOfGradesContainer d-flex' key={this.props.typeOfGradeData.id}>
                <div className='typeOfGradeNameWrapper'>
                    {/*<span className='typeOfGradeName pageText' > {this.props.typeOfGradeData.name} </span>*/}
                    <a className='typeOfGradeName pageText' href={`https://localhost:44414/grades/${this.props.typeOfGradeData.id}`}>{this.props.typeOfGradeData.name} </a>
                </div>
                <div className="removeTypeButtonWrapper ml-auto">
                    <button className="removeTypeButton" onClick={() => this.deleteTypeOfGrade(this.props.typeOfGradeData.id)}>
                        Премахни
                    </button>
                </div>
            </div>
        )
    }
}
