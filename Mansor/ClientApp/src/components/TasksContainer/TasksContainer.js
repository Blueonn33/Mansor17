import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TasksContainer/TaskContainer.css';

export default class TasksContainer extends Component {

    completeTask(taskItemId) {
        fetch(endpoints.completeTask(taskItemId), {
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
            <div className='taskItemsContainer d-flex' key={this.props.taskItemData.id}>
                <div className='taskItemNameWrapper'>
                    <span className='taskItemName pageText'> {this.props.taskItemData.value} </span>
                </div>
                <div className='useTaskItemButtonWrapper ml-auto'>
                    <button className='useButton' onClick={() => this.completeTask(this.props.taskItemData.id)}>
                    </button>
                </div>
            </div>
        )
    }
}
