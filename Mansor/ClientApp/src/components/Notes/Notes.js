import React, { Component } from 'react'
import { endpoints } from '../../endpoints';
import { AddNote } from '../AddNote/AddNote';
import '../Notes/Notes.css';
import NotesContainer from '../NotesContainer/NotesContainer';
import { FaBars, FaCalendarDay, FaListAlt, FaTable } from "react-icons/fa";
import authService from '../api-authorization/AuthorizeService';

export default class Notes extends Component {

    constructor(props) {
        super(props)
        this.state = { notes: [] }
        this.loadNotes = this.loadNotes.bind(this);
    }
    async componentDidMount() {
        this.loadNotes();
    }

    async loadNotes() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadNotes(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ notes: res }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='notesListWrapper d-flex justify-content-center align-items-center'>
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
                        <FaListAlt className="groupsIcon" />
                        <button className='groupsBtn'>
                            <a href={`https://localhost:44414/taskGroups`} className='groupsBtnText'>Групи</a>
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
                <div className='notesContainer'>
                    <div className='notesContent'>
                        <div className='notesListHeaderWrapper d-flex'>
                            <h4 className='notesListHeader'>Бележки</h4>
                        </div>
                        <div className="menu-bar-notes">
                            <FaBars id="bar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" />
                        </div>
                        <div className='createNewNoteButtonWrapper'>
                            <AddNote />
                        </div>
                        <div className='notesContainers'>
                            {this.state.notes.map((note) => {
                                return (
                                    <NotesContainer noteData={note} key={note.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
