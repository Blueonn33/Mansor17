import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TasksContainer/TaskContainer.css';
import authService from '../api-authorization/AuthorizeService';
import { FaCheckCircle } from 'react-icons/fa';

export default class TasksContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColors: {},
            value: '',
            currentColor: '',
            newColor: '',
        };
    }

    async componentDidMount(taskItemId) {
        const token = await authService.getAccessToken();
        fetch(endpoints.getTaskItemColor(taskItemId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ currentColor: data.color });
            });
        this.render();
    }

    handleColorChange = event => {
        this.setState({ newColor: event.target.value });
    };

    handleSubmit = async (taskItemId) => {
        var color = this.state.newColor;
        console.log(color);

        const token = await authService.getAccessToken();
        await fetch(endpoints.editTaskItem(taskItemId), {
            method: 'PATCH',
            body: JSON.stringify({ color: this.state.newColor }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ currentColor: data.color, newColor: '' });
            })
            .catch(error => {
                console.error(error);
            });

    };

    async completeTask(taskItemId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.completeTask(taskItemId), {
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
        let splittedURL = window.location.pathname.split('/')
        let taskGroupId = splittedURL[splittedURL.length - 1]
        return (
            <div className='taskItemsContainer d-flex' key={this.props.taskItemData.id}>
                <div className='taskItemNameWrapper' style={{ backgroundColor: this.props.taskItemData.color }}>
                    <span className='taskItemName pageText' > {this.props.taskItemData.value} </span>
                </div>
                <div className="checkTaskItemButtonWrapper ml-auto">
                    <FaCheckCircle className="checkButton" onClick={() => this.completeTask(this.props.taskItemData.id)}
                    />
                </div>
                <div className="colorTaskItemButtonWrapper ml-auto">
                    <a href={`https://localhost:44414/editTaskItem/${taskGroupId}/${this.props.taskItemData.id}`} className='colorButtonText'>Оцвети</a>
                </div>
            </div>
        )
    }
}
