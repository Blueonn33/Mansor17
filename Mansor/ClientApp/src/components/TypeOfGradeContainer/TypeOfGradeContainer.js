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

    async removeTypeOfData(typeOfDataId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.removeTypeOfData(typeOfDataId), {
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
            <div className='typeOfDatasContainer d-flex' key={this.props.typeOfGradeData.id}>
                <div className='typeOfDataNameWrapper'>
                    <span className='typeOfDataName pageText' > {this.props.typeOfGradeData.name} </span>
                    <hr id="typeOfDataLine"></hr>
                </div>
            </div>
        )
    }
}
