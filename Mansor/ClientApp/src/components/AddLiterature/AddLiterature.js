import React, { Component } from 'react';
import { endpoints } from '../../endpoints';
import './AddLiterature.css';
import authService from '../api-authorization/AuthorizeService';

export class AddLiterature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            value: '',
            taskGroupId: '',
        }
        this.createLiterature = this.createLiterature.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ keyword: event.target.value });
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

    async createLiterature(taskGroupId) {
        console.log(this.state.value);
        console.log(this.state.keyword);
        var firstInput = this.state.value;
        var secondInput = this.state.keyword;

        if (firstInput === '' || secondInput === '') {
            this.invalidInput();
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            taskGroupId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createLiterature(taskGroupId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    value: firstInput,
                    keyword: secondInput,
                    taskGroupId: taskGroupId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("invalid input")

                    }
                    else {
                        this.props.onLiteratureAdded(this.props.value, this.props.keyword);
                        this.state.value = '';
                        this.state.keyword = '';
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
                <div className="addLiteratureContainer">
                    <div className="literatureInputText">
                        <h5 className="literatureInputKeyword">Ключова дума</h5>
                        <h5 className="literatureInputContent">Стойност</h5>
                    </div>
                    <div className="literatureInputContainer">
                        <input type="text" className="literatureKeyword"
                            keyword={this.state.keyword}
                            onChange={(e) => this.setState({ 'keyword': e.target.value })}
                        />
                        <input type="text" className="literatureValue"
                            value={this.state.value}
                            onChange={(e) => this.setState({ 'value': e.target.value })}
                        />
                    </div>
                    <div className="addLiteratureBtnContainer">
                        <span className="addLiteratureBtn" onClick={this.createLiterature}>Добави</span>
                    </div>
                </div>
                <div id="snackbar">Въведете текст в полето</div>
            </div>
        );
    }
}
