import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import '../NotesContainer/NotesContainer.css';
import authService from '../api-authorization/AuthorizeService';

export default class NotesContainer extends Component {

    async deleteNote(noteId) {
        const token = await authService.getAccessToken();
        await fetch(endpoints.deleteNote(noteId), {
            method: 'DELETE',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Resource deleted successfully');
            })
            .catch(error => {
                console.error('There was a problem deleting the resource:', error);
            });
        window.location.reload();
    }


    render() {
        return (
            <div className='notesContainer d-flex' key={this.props.noteData.id}>
                <div className="noteElement">
                    <div className='noteTitleWrapper'>
                        <h5 className='noteTitle pageText'> {this.props.noteData.title} </h5>
                    </div>
                    <div className='noteContentWrapper'>
                        <span className='noteContent pageText'> {this.props.noteData.content} </span>
                    </div>
                    <div className='deleteNoteButtonWrapper ml-auto'>
                        <button className='deleteNoteButton' onClick={() => this.deleteNote(this.props.noteData.id)}>
                            Изтрий
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
