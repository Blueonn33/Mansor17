import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../GradesContainer/GradesContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class TasksContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    async componentDidMount(gradeId) {
        const token = await authService.getAccessToken();
        fetch(endpoints.getGrade(gradeId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
        this.render();
    }

    render() {
        return (
            <div className='gradesContainer d-flex' key={this.props.gradeData.id}>
                <div className='gradeNameWrapper'>
                    <span className='gradeName pageText' > {this.props.gradeData.value} </span>
                </div>
            </div>
        )
    }
}

