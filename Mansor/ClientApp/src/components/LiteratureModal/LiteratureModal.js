import React, { Component } from 'react';
import './LiteratureModal.css';
import '../../custom.css';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export class LiteratureModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            value: '',
            errorMessageKeyword: '',
            errorMessageValue: '',
            textColorKeyword: '',
            textColorValue: '',
        }
        this.createLiterature = this.createLiterature.bind(this);
    }
    createdLiterature() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }
    async createLiterature(event) {
        event.preventDefault();
        console.log(this.state.keyword);
        var keywordInput = this.state.keyword;
        var valueInput = this.state.value;

        const errors = {
            minLength: "Заглавието е твърде кратко.",
            minLengthValue: "Съдържанието е твърде кратко.",
            maxLength: "Заглавието е твърде дълго.",
            existingLiterature: "Бележката вече съществува."
        }
        const color = {
            error: "red",
            success: "green"
        }
        if (keywordInput.length < 3) {

            this.setState({ errorMessageKeyword: errors.minLength });
            this.setState({ textColorKeyword: color.error });
        }
        else if (keywordInput.length > 50) {
            this.setState({ errorMessageKeyword: errors.maxLength });
            this.setState({ textColorKeyword: color.error });
        }
        else if (valueInput.length < 3) {

            this.setState({ errorMessageValue: errors.minLengthValue });
            this.setState({ errorMessageKeyword: '' });
            this.setState({ textColorValue: color.error });
            this.setState({ textColorKeyword: color.success });
        }
        else {
            const token = await authService.getAccessToken();
            let splittedURL = window.location.pathname.split('/')
            let taskGroupId = splittedURL[splittedURL.length - 1]
            await fetch(endpoints.createLiterature(taskGroupId), {
                method: 'POST',
                headers: {
                    'Value-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "keyword": keywordInput,
                    "value": valueInput,
                    "taskGroupId": taskGroupId
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        this.setState({ errorMessageKeyword: errors.existingLiterature });
                        this.setState({ textColorKeyword: color.error });
                        this.setState({ textColorValue: color.error });
                    }
                    else {
                        this.createdLiterature();
                        this.setState({ textColorKeyword: color.success });
                        this.setState({ textColorValue: color.success });
                        this.setState({ errorMessageValue: '' });
                        this.setState({ errorMessageKeyword: '' });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    componentDidMount() {
        this.render();
    }
    close() {
        this.setState({ 'keywordInput': '' });
        this.setState({ 'literatureInput': '' });
        this.setState({ errorMessageKeyword: '' });
        this.setState({ errorMessageValue: '' });
        this.setState({ textColor: 'gray' })
    }

    render() {
        return (
            <div>
                <form id="literatureForm" onSubmit={this.createLiterature}>
                    <h2 id="literature-txt">Добави литература</h2>
                    <hr id="line"></hr>
                    <div className="literatureInputs">
                        <label>Ключова дума:
                            <input type="text" id="literature-keyword" className="form-control"
                                onChange={(e) => this.setState({ 'keyword': e.target.value })}
                                style={{ borderBottomColor: this.state.textColorKeyword }}
                            />
                        </label>
                    </div>
                    <div className="literatureInputs">
                        <label>Съдържание:
                            <textarea type="text" id="literature-value" className="form-control"
                                onChange={(e) => this.setState({ 'value': e.target.value })}
                                style={{ borderBottomColor: this.state.textColorValue }}
                            />
                        </label>
                    </div>
                    <div className="errorLiterature">
                        <span style={{ color: this.state.textColorKeyword }}>
                            {this.state.errorMessageKeyword}</span>
                    </div>
                    <div className="errorLiterature">
                        <span style={{ color: this.state.textColorValue }}>
                            {this.state.errorMessageValue}</span>
                    </div>
                    <div>
                        <button id="btn-literatureForm">Добави</button>
                    </div>
                    <div>
                        <button id="btn-cancel">
                            <a href={`https://localhost:44414/literatures`} id="cancel-text">Назад</a>
                        </button>
                    </div>
                </form>
                <div id="snackbar">Успешно добавихте литература</div>
            </div>
        );
    }
}
