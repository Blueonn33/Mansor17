import React, { Component } from 'react'
import '../CoursesContainer/CoursesContainer.css';

export default class CoursesContainer extends Component {

    render() {
        return (
            <div className='coursesContainer d-flex' key={this.props.courseData.id}>
                <div className='coursesNameWrapper'>
                    <span className='coursesName pageText'> {this.props.courseData.value} </span>
                </div>
                <div className='useCoursesButtonWrapper ml-auto'>
                    <button className='useCourseButton'>
                        <a href={`https://localhost:44414/semesters/${this.props.courseData.id}`} className='useButtonText'>Преглед</a>
                    </button>
                </div>
            </div>
        )
    }
}
