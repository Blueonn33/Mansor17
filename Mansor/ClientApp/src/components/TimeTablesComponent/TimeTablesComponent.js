import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../TimeTablesComponent/TimeTablesComponent.css';
import TimeTablesContainer from '../TimeTablesContainer/TimeTablesContainer';
import { FaBars, FaCalendarDay, FaListAlt, FaRegStickyNote } from "react-icons/fa";
import authService from '../api-authorization/AuthorizeService';

export default class TimeTablesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { days: [] }
        this.loadDays = this.loadDays.bind(this);
    }
    async componentDidMount() {
        this.loadDays();
    }

    async loadDays() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadDays(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ days: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='timeTablesListWrapper d-flex justify-content-center align-items-center'>
                <div className="offcanvas offcanvas-start" id="offcanvas">
                    <div className="offcanvas-header">
                        <h3 className="offcanvas-title text-white">Мартин Маринов</h3>
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
                        <FaListAlt className='groupsIcon' />
                        <button className='groupsBtn'>
                            <a href={`https://localhost:44414/taskGroups`} className='groupsBtnText'>Групи</a>
                        </button>
                        <hr id="line"></hr>
                    </div>
                </div>
                <div className='timeTablesContainer'>
                    <div className='timeTablesContent'>
                        <div className='timeTablesListHeaderWrapper d-flex'>
                            <h4 className='timeTablesListHeader'>Учебна програма</h4>
                        </div>
                        <div className="menu-bar">
                            <FaBars id="bar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" />
                        </div>
                        <div className='timeTablesContainers'>
                            {this.state.days.map((day) => {
                                return (
                                    <TimeTablesContainer dayData={day} key={day.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}