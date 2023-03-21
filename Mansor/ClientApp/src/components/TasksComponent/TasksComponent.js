﻿import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TasksComponent/TasksComponent.css';
import { AddTaskItem } from '../AddTaskItem/AddTaskItem';
import TasksContainer from '../TasksContainer/TasksContainer';

export default class TasksComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            currentTaskGroupName: '',
            taskGroupData: undefined,
            taskGroupHeaderName: '',
            taskItemData: undefined,
            currentTaskItemValue: '',
        }
        this.loadTaskItems = this.loadTaskItems.bind(this);
    }
    async componentDidMount() {
        this.loadTaskItems();
        this.getTaskGroupName();
    }

    getTaskGroupName = async (taskGroupId) => {
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.getTaskGroupName(taskGroupId))
            .then(async (res) => {
                let taskGroupData = await res.json()
                this.setState({ 'taskGroupData': taskGroupData })
                this.setState({ 'currentTaskGroupName': taskGroupData.name })
                this.setState({ 'taskGroupHeaderName': taskGroupData.name })
            }
            )
    }

    async loadTaskItems(taskGroupId){
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7286/api/taskItems/${taskGroupId}`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({ tasks: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='taskItemsListWrapper d-flex justify-content-center align-items-center'>
                <div className='taskItemsContainer'>
                    <div className='taskItemsContent'>
                        <div className='taskItemsListHeaderWrapper d-flex'>
                            <h4 className='taskItemsListHeader'>{this.state.taskGroupHeaderName}</h4>
                        </div>
                        <div className='createNewTaskItemButtonWrapper'>
                            <AddTaskItem onTaskItemAdded={this.loadTaskItems} />
                        </div>
                        <div className='taskItemsContainers'>
                            {this.state.tasks.map((taskItem) => {
                                return (
                                    <TasksContainer taskItemData={taskItem} key={taskItem.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div id="snackbar">Еnter text in the input field</div>
            </div>
        );
    }
}