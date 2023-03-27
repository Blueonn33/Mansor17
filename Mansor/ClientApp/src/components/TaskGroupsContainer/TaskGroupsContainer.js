import React, { Component } from 'react'
import '../TaskGroupsContainer/TaskGroupsContainer.css';
import { FaTrashAlt } from "react-icons/fa";
import { endpoints } from '../../endpoints';

export default class TaskGroupsContainer extends Component {

    render() {
        return (
            <div className='taskGroupsContainer d-flex' key={this.props.taskGroupData.id}>
                <div className='taskGroupNameWrapper'>
                    <span className='taskGroupName pageText'> {this.props.taskGroupData.name} </span>
                </div>
                <div className='useTaskGroupButtonWrapper ml-auto'>
                    <button className='useButton'>
                        <a href={`https://localhost:44414/taskItems/${this.props.taskGroupData.id}`} className='useButtonText'>Използвай</a>
                    </button>
                </div>
            </div>
        )
    }
}
