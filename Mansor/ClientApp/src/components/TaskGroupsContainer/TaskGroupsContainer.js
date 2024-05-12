import React, { Component } from 'react'
import '../TaskGroupsContainer/TaskGroupsContainer.css';
import { AddGrade } from '../AddGrade/AddGrade';

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
                <div className='gradeTaskGroupButtonWrapper ml-auto'>
                    <button className='gradeTaskGroupButton'>
                        <a href={`https://localhost:44414/grades/${this.props.taskGroupData.id}`} className='useButtonText'>Оценка</a>
                    </button>
                </div>
               
            </div>
        )
    }
}
