import React, { Component } from 'react';
import '../ScheduleComponent/ScheduleComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

export class ScheduleComponent extends Component {
    static displayName = ScheduleComponent.name;

    render() {
        return (
            <div>
                <div className="schedule-container">
                    <div className="schedule-content">
                        <div className="scheduleTitle">
                            Специалности
                        </div>
                    </div>
                    <div className="specialitiesList">
                        <ul>
                            <li><a href="informatics">Информатика</a></li>
                            <li><a href="pedagogy_of_learning_in_mathematics_and_informatics">Педагогика на обучението по математика и информатика</a></li>
                            <li><a href="software_engineering">Софтуерно инженерство</a></li>
                            <li><a href="computer_sciences">Компютърни науки</a></li>
                            <li><a href="applied_mathematics">Приложна математика</a></li>
                            <li><a href="information_brokerage_and_digital_media">Информационно брокерство и дигитални медии</a></li>
                        </ul>
                    </div>
                    {/*<div className="specialitiesBtnContainer">*/}
                    {/*    <Link to='/specialities' className="specialitiesBtn">Към специалностите</Link>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}
