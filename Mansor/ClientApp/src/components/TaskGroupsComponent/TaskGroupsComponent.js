﻿import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddTaskGroup } from '../AddTaskGroup/AddTaskGroup.js';
import '../TaskGroupsComponent/TaskGroupsComponent.css';
import TaskGroupsContainer from '../TaskGroupsContainer/TaskGroupsContainer';
import { FaBars, FaCalendarDay, FaRegStickyNote, FaTable, FaPeopleArrows } from "react-icons/fa";
import authService from '../api-authorization/AuthorizeService';

export default class TaskGroupsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskGroup: [],
            taskGroupData: undefined
        }
        this.loadTaskGroups = this.loadTaskGroups.bind(this);
    }
    async componentDidMount() {
        this.loadTaskGroups();
    }
    async loadTaskGroups(semesterId) {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        semesterId = splittedURL[splittedURL.length - 1]
        let url = `https://localhost:7043/api/taskGroups/${semesterId}`;
        fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ taskGroup: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='taskGroupsListWrapper d-flex justify-content-center align-items-center'>
                <div className="offcanvas offcanvas-start" id="offcanvas">
                    <div className="offcanvas-header">
                        <h3 className="offcanvas-title text-white"></h3>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <hr id="line"></hr>
                    <div className="offcanvas-body text-white">
                        <FaCalendarDay className="calendarIcon" />
                        <button className='calendarBtn'>
                            <a href={`https://localhost:44414/calendar`} className='calendarBtnText'>Календар</a>
                        </button> 
                        <hr id="line"></hr>
                    </div>
                    <div className="offcanvas-body text-white">
                        <FaRegStickyNote className="notesIcon" />
                        <button className='notesBtn'>
                            <a href={`https://localhost:44414/notes`} className='notesBtnText'>Бележки</a>
                        </button> 
                        <hr id="line"></hr>
                    </div>
                    <div className="offcanvas-body text-white">
                        <FaTable className='timeTableIcon' />
                        <button className='timeTableBtn'>
                            <a href={`https://localhost:44414/timeTable`} className='timeTableBtnText'>Програма</a>
                        </button> 
                        <hr id="line"></hr>
                    </div>
                    <div className="offcanvas-body text-white">
                        <FaPeopleArrows className='informationIcon' />
                        <button className='informationBtn'>
                            <a href={`https://localhost:44414/schedule`} className='informationBtnText'>Информация</a>
                        </button>
                        <hr id="line"></hr>
                    </div>
                </div>
                <div className='taskGroupsContainer'>
                    <div className='taskGroupsContent'>
                        <div className='taskGroupsListHeaderWrapper d-flex'>
                            <h4 className='taskGroupsListHeader'>Дисциплини</h4>
                        </div>
                        <div className="menu-bar">
                            <FaBars id="bar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" />
                        </div>
                        <div className='createNewTaskGroupButtonWrapper'>
                            <AddTaskGroup onTaskGroupAdded={this.loadTaskGroups} />
                        </div>
                        <div className='taskGroupsContainers'>
                            {this.state.taskGroup.map((taskGroup) => {
                                return (
                                    <TaskGroupsContainer taskGroupData={taskGroup} key={taskGroup.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}