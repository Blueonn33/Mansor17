import React, { Component } from 'react';
import './AddGrade.css';
import { endpoints } from "../../endpoints";
import { Link } from "react-router-dom";
import authService from '../api-authorization/AuthorizeService';

export class AddGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taskGroupId: undefined,
            errorMessage: '',
            textColor: '',
        }
        this.createGrade = this.createGrade.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async createGrade(event) {
        event.preventDefault();
        console.log(this.state.value);
        var input = this.state.value;

        const errors = {
            success: "Добавихте оценка",
            existinGrade: "Вече е добавена оценка"
        }
        const color = {
            error: "red",
            success: "green"
        }

        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        let taskGroupId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.createGrade(taskGroupId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                value: input,
                taskGroupId: taskGroupId,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("invalid input")
                    this.setState({ errorMessage: errors.existingGrade });
                    this.setState({ textColor: color.error });
                }
                else {
                    this.props.onGradeAdded(this.props.value);
                    this.state.value = '';
                    this.setState({ errorMessage: errors.success });
                    this.setState({ textColor: color.success });
                }
            })
            .catch(error => {
               
                console.error(error);
            });
    }
    historyBack() {
        let splittedURL = window.location.pathname.split('/')
        let routeId = splittedURL[splittedURL.length - 1]
        this.setState({ taskGroupId: routeId });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount() {
        this.render();
        this.historyBack();
    }
    close() {
        this.setState({ 'value': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
    }
    render() {
        return (
            <div className="container">
                <div className="container" id="modal">
                    <button type="button" className="createGrade" data-bs-toggle="modal" data-bs-target="#addGradeModal">
                        Оценка
                    </button>
                </div>
                <div className="modal fade" id="addGradeModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div id="myForm">
                                    <form onSubmit={this.createGrade}>
                                        <label htmlFor="gradeNameField" className="gradeLabelText">Оценка:</label>
                                        <input type="text" name="gradeNameField" className="form-control" id="gradeInputModal"
                                            onChange={(e) => this.setState({ 'value': e.target.value })}
                                            style={{ borderBottomColor: this.state.textColor }}
                                        />
                                        <div className="modal-footer border-0">
                                            <div id="errorGrade">
                                                <p style={{ color: this.state.textColor }}>
                                                    {this.state.errorMessage}</p>
                                            </div>
                                            <button className='gradesModalBackBtn' onClick={this.close}>
                                                <a href={`https://localhost:44414/grades/${this.state.taskGroupId}`} className="gradesModalBackBtnText">Назад</a>
                                            </button>
                                            <button type="submit" method="post" className="addGradeModalBtn" name="addGrade">Добави</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}