import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../GradesContainer/GradesContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class TasksContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taskGroupId: '',
            currentTaskGroupName: '',
            taskGroupData: undefined,
            taskGroupHeaderName: '',
            
        };
    }

    async componentDidMount(gradeId) {
        const token = await authService.getAccessToken();
        fetch(endpoints.loadGrades(gradeId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
        this.render();
        this.getTaskGroupName();
    }

    getTaskGroupName = async (taskGroupId) => {
        const token = await authService.getAccessToken();
        //let splittedURL = window.location.pathname.split('/')
        taskGroupId = this.props.gradeData.taskGroupId;
        this.state.taskGroupId = taskGroupId;
        await fetch(endpoints.getTaskGroupName(taskGroupId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(async (res) => {
                let taskGroupData = await res.json()
                this.setState({ 'taskGroupData': taskGroupData })
                this.setState({ 'currentTaskGroupName': taskGroupData.name })
                this.setState({ 'taskGroupHeaderName': taskGroupData.name })
            }
            )
    }

    render() {
        return (
            <div className='gradesValuesContainer d-flex' key={this.props.gradeData.id}>
                <div className='gradeNameValueContainer'>
                    <div className='gradeTaskGroupNameWrapper'>
                        <span className='gradeTaskGroupName pageText' > {this.state.taskGroupHeaderName} </span>
                    </div>
                    <div className='gradeValueWrapper'>
                        <span className='gradeValue pageText' > {this.props.gradeData.value} </span>
                    </div>
                </div>
            </div>
        )
    }
}

