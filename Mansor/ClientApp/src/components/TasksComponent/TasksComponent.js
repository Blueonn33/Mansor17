import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TasksComponent/TasksComponent.css';
import { AddTaskItem } from '../AddTaskItem/AddTaskItem';
import TasksContainer from '../TasksContainer/TasksContainer';
import { EditTaskGroup } from '../EditTaskGroup/EditTaskGroup';

export default class TasksComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            taskGroupId: '',
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
        this.state.taskGroupId = taskGroupId
        await fetch(endpoints.getTaskGroupName(taskGroupId))
            .then(async (res) => {
                let taskGroupData = await res.json()
                this.setState({ 'taskGroupData': taskGroupData })
                this.setState({ 'currentTaskGroupName': taskGroupData.name })
                this.setState({ 'taskGroupHeaderName': taskGroupData.name })
            }
            )
    }

    deleteTaskGroup = async (taskGroupId) => {
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.deleteTaskGroup(taskGroupId), {
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
        window.location.pathname = '/taskGroups'
    }

    async loadTaskItems(taskGroupId){
        let splittedURL = window.location.pathname.split('/')
        taskGroupId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/taskItems/${taskGroupId}`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({ tasks: res }))
            //.then(async (res) => {
            //    let taskItemData = await res.json()
            //    this.setState({ 'taskItemData': taskItemData })
            //    this.setState({ 'currentTaskItemValue': taskItemData.value })
            //}
            //)
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='taskItemsListWrapper d-flex justify-content-center align-items-center'>
                <div className='taskItemsContainer'>
                    <div className='taskItemsContent'>
                        <div className='deleteTaskGroupButtonWrapper ml-auto'>
                            <button className='deleteButton' onClick={this.deleteTaskGroup}>Изтрий</button>
                            <button className='editButton'>
                                <a href={`https://localhost:44414/editTaskGroup/${this.state.taskGroupId}`} id="edit-text">Редактирай</a>
                            </button>
                        </div>
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