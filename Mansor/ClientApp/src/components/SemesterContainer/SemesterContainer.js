import React, { Component } from 'react'
import '../SemesterContainer/SemesterContainer.css';

export default class SemesterContainer extends Component {

    render() {
        return (
            <div className='semestersContainer d-flex' key={this.props.semesterData.id}>
                <div className='semestersNameWrapper'>
                    <span className='semestersName pageText'> {this.props.semesterData.value} </span>
                </div>
                <div className='useSemestersButtonWrapper ml-auto'>
                    <button className='useSemesterButton'>
                        <a href={`https://localhost:44414/taskGroups/${this.props.semesterData.id}`} className='useButtonText'>Преглед</a>
                    </button>
                </div>
            </div>
        )
    }
}
