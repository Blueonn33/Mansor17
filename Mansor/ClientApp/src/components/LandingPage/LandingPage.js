import React, { Component } from 'react';
import '../LandingPage/LandingPageStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Calendar } from 'devextreme-react';
import { Footer } from '../Footer/Footer';

export class LandingPage extends Component {
    static displayName = LandingPage.name;

    showImg(modal, img, modal1, modal2) {
        document.getElementById(modal).style.display = 'block';
        document.getElementById(img).style.display = 'block';
        document.getElementById(modal1).style.display = 'none';
        document.getElementById(modal2).style.display = 'none';
    }

    closeImg(modal, img) {
        document.getElementById(modal).style.display = 'none';
        document.getElementById(img).style.display = 'none';
    }

    render() {
        return (
                <div>
                    <div className="body-container">
                        <div className="body-content">
                            <div className="row">
                                <div className="col-sm-12">
                                    <article className="main-content">
                                        <header>
                                            <p>
                                                MANSOR e студентски бележник, насочен към подпомагане на студентите в тяхната академична
                                                и личностна реализация. Това приложение предлага цялостно решение за ефективно управление
                                                на учебните задачи, личното време и активности, които допринасят за развитието на студентите.
                                            </p>
                                            <p>
                                                Разнообразие от полезни и лесни за използване функционалности.
                                                Опростеността и изчистеният дизайн са в основата на MANSOR.
                                            </p>
                                        </header>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="functionalities d-flex mb-3">
                        <li className="option p-2 flex-fill" id="task"
                            onClick={() => this.showImg("modal-tasks", "tasksImg", "modal-table", "modal-notes")}>
                            Списък със задачи</li>
                        <li className="option p-2 flex-fill" id="shedule"
                        onClick={() => this.showImg("modal-table", "tableImg", "modal-tasks", "modal-notes")}>
                            Учебна програма</li>
                        <li className="option p-2 flex-fill" id="notes"
                        onClick={() => this.showImg("modal-notes", "notesImg", "modal-table", "modal-tasks")}>
                            Бележки</li>
                    </ul>
                     <div id="modal-tasks">
                        <div className="tasksImg">
                            <a target="_blank" href='/Images/Tasks.png'>
                                <img id="tasksImg" src='/Images/Tasks.png' alt="Tasks" href='/Images/Tasks.png' />
                            </a>
                        </div>
                        <div className="body-content">
                            <div className="tasks-content">
                                <h2 id="h2-tasks">Задачи</h2>
                                <p>Добавете списък със задачи към изучаваните от вас дисциплини.</p>
                                <p>
                                    Чрез бутона 'Оцвети' можете да променяте цвета на задачите, за да ги
                                    групирате по ваш начин.
                                </p>
                                <p>
                                    Тикчето премахва дадена задача, което означава, че сте я изпълнили.
                                    Браво!
                                </p>
                            </div>
                            <button id="btn-close" onClick={() => this.closeImg("modal-tasks","tasksImg")}>Затвори</button>
                        </div>
                    </div>
                    <div id="modal-table">
                        <div>
                            <a target="_blank" href='/Images/Timetable.png'>
                                <img id="tableImg" src='/Images/Timetable.png' alt="Time table" href='/Images/Timetable.png'/>
                            </a>
                        </div>
                        <div class="body-content">
                            <div class="table-content">
                                <h2 id="h2-table">Учебна програма</h2>
                                <p>Дните в учебната програма са пет - от понеделник до петък.</p>
                                <p>Добавете учебни предмети към всеки един от тях.</p>
                                <p>
                                    Задайте продължителност за всеки един предмет.
                                </p>
                            </div>
                        </div>
                        <button id="btn-close" onClick={() => this.closeImg("modal-table", "tableImg")}>Затвори</button>
                    </div>
                    <div id="modal-notes">
                    <div>
                        <a target="_blank" href='/Images/Notes.png'>
                            <img id="notesImg" src='/Images/Notes.png' alt="Notes" href='/Images/Notes.png' />
                        </a>
                        </div>
                        <div className="body-content">
                            <div className="notes-content">
                                <h2 id="h2-notes">Бележки</h2>
                                <p>Добавете бележка, когато желаете да напишете повече текст.</p>
                                <p>Сложете заглавие на бележката, за да се подсещате за какво е.</p>
                                <p>
                                   След това с няколко изречения запишете задачата си.
                                </p>
                            </div>
                        </div>
                        <button id="btn-close" onClick={() => this.closeImg("modal-notes", "notesImg")}>Затвори</button>
                </div>
                    <div className="calendar-demo">
                        <h1 className="calendarText">Изпробвайте нашия календар</h1>
                        <div className="calendar-content">
                            <p>Лесен е за използване</p>
                            <p>Можете да зададете първоначалния изглед на календара</p>
                             <ul className="initialView">
                                <li>- Месец</li>
                                <li>- Година</li>
                                <li>- Десетилетие</li>
                                <li>- Век</li>
                            </ul>
                            <p>Текущият ден е с удебелен шрифт</p>
                        </div>
                        <div className="calendarContainer">
                            <Calendar className="calendar" />
                        </div>
                    </div>
                    <Footer />
                </div>
        );
    }
}
