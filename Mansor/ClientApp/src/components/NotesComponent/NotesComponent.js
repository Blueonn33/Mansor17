import React, { Component } from 'react';
import './NotesComponent.css';
import '../../custom.css';
import { endpoints } from '../../endpoints';

export class NotesComponent extends Component {
    static displayName = NotesComponent.name;

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            errorMessageTitle: '',
            errorMessageContent: '',
            textColorTitle: '',
            textColorContent: '',
        }
        this.createNote = this.createNote.bind(this);
    }
    createdNote() {
        var msg = document.getElementById("snackbar");
        msg.className = "show";
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000);
    }
    async createNote(event) {
        event.preventDefault();
        console.log(this.state.title);
        var titleInput = this.state.title;
        var contentInput = this.state.content;

        const errors = {
            minLength: "Заглавието е твърде кратко.",
            minLengthContent: "Съдържанието е твърде кратко.",
            maxLength: "Заглавието е твърде дълго.",
            existingNote: "Бележката вече съществува."
        }
        const color = {
            error: "red",
            success: "green"
        }
        if (titleInput.length < 3) {

            this.setState({ errorMessageTitle: errors.minLength });
            this.setState({ textColorTitle: color.error });
        }
        else if (titleInput.length > 50) {
            this.setState({ errorMessageTitle: errors.maxLength });
            this.setState({ textColorTitle: color.error });
        }
        else if (contentInput.length < 3) {

            this.setState({ errorMessageContent: errors.minLengthContent });
            this.setState({ errorMessageTitle: '' });
            this.setState({ textColorContent: color.error });
            this.setState({ textColorTitle: color.success });
        }
        else {
            await fetch(endpoints.createNote(), {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "title": titleInput,
                    "content": contentInput,
                    "userId": "3b6f5e57-edde-4dac-84bd-fcf320be8dad"
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        this.setState({ errorMessageTitle: errors.existingNote });
                        this.setState({ textColorTitle: color.error });
                        this.setState({ textColorContent: color.error });
                    }
                    else {
                        this.createdNote();
                        this.setState({ textColorTitle: color.success });
                        this.setState({ textColorContent: color.success });
                        this.setState({ errorMessageContent: '' });
                        this.setState({ errorMessageTitle: '' });
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
        this.setState({ 'titleInput': '' });
        this.setState({ 'noteInput': '' });
        this.setState({ errorMessageTitle: '' });
        this.setState({ errorMessageContent: '' });
        this.setState({ textColor: 'gray' })
    }

    render() {
        return (
            <div>
                <form id="noteForm" onSubmit={this.createNote}>
                    <h2 id="note-txt">Добави бележка</h2>
                    <hr id="line"></hr>
                    <div className="inputs">
                        <label>Заглавие:
                            <input type="text" id="note-title" className="form-control"
                                onChange={(e) => this.setState({ 'title': e.target.value })}
                                style={{ borderBottomColor: this.state.textColorTitle }}
                            />
                        </label>
                    </div>
                    <div className="inputs">
                        <label>Съдържание:
                            <textarea type="text" id="note-content" className="form-control"
                                onChange={(e) => this.setState({ 'content': e.target.value })}
                                style={{ borderBottomColor: this.state.textColorContent }}
                            />
                        </label>
                    </div>
                    <div className="errorNote">
                        <span style={{ color: this.state.textColorTitle }}>
                            {this.state.errorMessageTitle}</span>
                    </div>
                    <div className="errorNote">
                        <span style={{ color: this.state.textColorContent }}>
                            {this.state.errorMessageContent}</span>
                    </div>
                    <div>
                        <button id="btn-noteForm">Добави</button>
                    </div>
                    <div>
                        <button id="btn-cancel">
                            <a href={`https://localhost:44414/notes`} id="cancel-text">Назад</a>
                        </button>
                    </div>
                </form>
                <div id="snackbar">Успешно добавихте бележка</div>
            </div>
        );
    }
}
