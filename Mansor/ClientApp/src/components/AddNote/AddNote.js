import React, { Component } from 'react';
import './AddNote.css';
import '../../custom.css';

export class AddNote extends Component {
    static displayName = AddNote.name;

    render() {
        return (
            <div>
                <div className="container">
                    <div className="container">
                        <div className='noteButtonWrapper ml-auto'>
                            <button className='noteButton'>
                                <a href={`https://localhost:44414/addNote`} className='noteButtonText'>Добави</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
