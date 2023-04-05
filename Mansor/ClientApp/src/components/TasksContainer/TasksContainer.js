import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TasksContainer/TaskContainer.css';
import authService from '../api-authorization/AuthorizeService';
import { FaRegStar } from 'react-icons/fa';

export default class TasksContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColors: {},
        };
    }

    handleClick = (id) => {
        this.setState(prevState => ({
            backgroundColors: {
                ...prevState.backgroundColors,
                [id]: 'white',
            },
        }));
    }

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
        return (
            <div className='taskItemsContainer d-flex' key={this.props.taskItemData.id}>
                <div className='taskItemNameWrapper' style={{ backgroundColor: this.state.backgroundColors['this.props.taskItemData.id'] }}>
                    <span className='taskItemName pageText' > {this.props.taskItemData.value} </span>
                </div>
                <div className='useTaskItemButtonWrapper ml-auto'>
                    <button className='useButton' onClick={() => this.completeTask(this.props.taskItemData.id)}>
                    </button>
                </div>
                <div className="starTaskItemButtonWrapper ml-auto">
                    <FaRegStar className="starButton" onClick={() => this.handleClick('this.props.taskItemData.id')}
                    />
                </div>
            </div>
        )
    }
}
