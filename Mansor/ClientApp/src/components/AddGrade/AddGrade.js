import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddGrade.css';
import authService from '../api-authorization/AuthorizeService';

export class AddGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            typeOfGradeId: '',
        }
        this.createGrade = this.createGrade.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        this.render();
    }

    async createGrade(typeOfGradeId) {
        console.log(this.state.value);
        var input = this.state.value;

        if (input === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            typeOfGradeId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createGrade(typeOfGradeId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    value: input,
                    typeOfGradeId: typeOfGradeId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")

                    }
                    else {
                        this.props.onGradeAdded(this.props.value);
                        this.state.value = '';
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <div className="containerGrade">
                    <div className="container">
                        <input type="text" id="input-grade"
                            placeholder="Оценка"
                            value={this.state.value}
                            onChange={(e) => this.setState({ 'value': e.target.value })}
                        />
                        <span className="addGradeBtn" onClick={this.createGrade}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
