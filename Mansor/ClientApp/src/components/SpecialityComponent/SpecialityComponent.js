import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddSpeciality } from '../AddSpeciality/AddSpeciality.js';
import '../SpecialityComponent/SpecialityComponent.css';
import SpecialityContainer from '../SpecialityContainer/SpecialityContainer';
import { FaBars, FaCalendarDay, FaRegStickyNote, FaTable } from "react-icons/fa";
import authService from '../api-authorization/AuthorizeService';

export default class SpecialityComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            speciality: [],
        }
        this.loadSpecialities = this.loadSpecialities.bind(this);
    }
    async componentDidMount() {
        this.loadSpecialities();
    }
    async loadSpecialities() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadSpecialities(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ speciality: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='specialityListWrapper d-flex justify-content-center align-items-center'>
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
                </div>
                <div className='specialityContainer'>
                    <div className='specialityContent'>
                        <div className='specialityListHeaderWrapper d-flex'>
                            <h4 className='specialityListHeader'>Специалности</h4>
                        </div>
                        <div className="menu-bar">
                            <FaBars id="bar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" />
                        </div>
                        <div className='createNewSpecialityButtonWrapper'>
                            <AddSpeciality onSpecialityAdded={this.loadSpecialities} />
                        </div>
                        <div className='specialityContainers'>
                            {this.state.speciality.map((speciality) => {
                                return (
                                    <SpecialityContainer specialityData={speciality} key={speciality.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}