import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddTypeOfGrade.css';
import authService from '../api-authorization/AuthorizeService';

export class AddTypeOfGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            studentId: '',
        }
        this.createTypeOfGrade = this.createTypeOfGrade.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    invalidInput() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }

    componentDidMount() {
        this.render();
    }

    async createTypeOfGrade(studentId) {
        console.log(this.state.name);
        var input = this.state.name;

        if (input === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            studentId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createTypeOfGrade(studentId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: input,
                    studentId: studentId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")
                        this.state.name = '';

                    }
                    else {
                        this.props.onTypeOfGradeAdded(this.props.name);
                        this.state.name = '';
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.state.name = '';
                });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="container">
                        <input type="text" id="input-type"
                            name={this.state.value}
                            onChange={(e) => this.setState({ 'name': e.target.value })}
                        />
                        <span className="addTypeBtn" onClick={this.createTypeOfGrade}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
