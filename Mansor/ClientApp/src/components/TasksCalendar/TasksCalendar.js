import React from 'react';
import CheckBox from 'devextreme-react/check-box';
import SelectBox from 'devextreme-react/select-box';
import DateBox from 'devextreme-react/date-box';
import Calendar from 'devextreme-react/calendar';
import CustomCell, { isWeekend } from './CustomCell.js';
import './TasksCalendar.css';
import { FaBars, FaListAlt, FaRegStickyNote, FaTable } from "react-icons/fa";

const zoomLevels = ['month', 'year', 'decade', 'century'];
const weekDays = [
    { id: 0, text: 'Неделя' },
    { id: 1, text: 'Понеделник' },
    { id: 2, text: 'Вторник' },
    { id: 3, text: 'Сряда' },
    { id: 4, text: 'Четвъртък' },
    { id: 5, text: 'Петък' },
    { id: 6, text: 'Събота' },
];

export function TasksCalendar() {
    const [minDateValue, setMinDateValue] = React.useState(null);
    const [maxDateValue, setMaxDateValue] = React.useState(null);
    const [weekendDisabled, setWeekendDisabled] = React.useState(null);
    const [firstDay, setFirstDay] = React.useState(1);
    const [showWeekNumbers, setShowWeekNumbers] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(new Date());
    const [useCellTemplate, setUseCellTemplate] = React.useState(null);
    const [zoomLevel, setZoomLevel] = React.useState('month');

    const onCurrentValueChange = React.useCallback(({ value }) => {
        setCurrentValue(value);
    }, [setCurrentValue]);

    const onZoomLevelChange = React.useCallback(({ value }) => {
        setZoomLevel(value);
    }, [setZoomLevel]);

    const onMinDateChange = React.useCallback(({ value }) => {
        setMinDateValue(
            value ? new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3) : null,
        );
    }, [setMinDateValue]);

    const onMaxDateChange = React.useCallback(({ value }) => {
        setMaxDateValue(
            value ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3) : null,
        );
    }, [setMaxDateValue]);

    const onDisableWeekendChange = React.useCallback(({ value }) => {
        setWeekendDisabled(value);
    }, [setWeekendDisabled]);

    const onFirstDayChange = React.useCallback(({ value }) => {
        setFirstDay(value);
    }, [setFirstDay]);

    const onShowWeekNumbersChange = React.useCallback(({ value }) => {
        setShowWeekNumbers(value);
    }, [setShowWeekNumbers]);

    const onUseCellTemplateChange = React.useCallback(({ value }) => {
        setUseCellTemplate(!!value);
    }, [setUseCellTemplate]);

    const isDateDisabled = React.useCallback(({ view, date }) => view === 'month' && isWeekend(date), []);

    const onOptionChange = React.useCallback((e) => {
        if (e.name === 'zoomLevel') {
            onZoomLevelChange(e);
        }
    }, [onZoomLevelChange]);

    return (
        <div id="container">
            <div className="offcanvas offcanvas-start" id="offcanvas">
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title text-white"></h3>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>
                <hr id="line"></hr>
                <div className="offcanvas-body text-white">
                    <FaListAlt className="groupsIcon" />
                    <button className='groupsBtn'>
                        <a href={`https://localhost:44414/taskGroups`} className='groupsBtnText'>Групи</a>
                    </button>
                    <hr id="line"></hr>
                </div>
                <div className="offcanvas-body text-white">
                    <FaRegStickyNote className="notesIcon" />
                    <button className='notesBtn'>
                        <a href={`https://localhost:44414/notes`} className='notesBtnText'>Бележки</a>
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
            <div className="menu-bar-calendar">
                <FaBars id="bar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" />
            </div>
            <div className="calendar-container">
                <Calendar
                    value={currentValue}
                    onValueChanged={onCurrentValueChange}
                    onOptionChanged={onOptionChange}
                    min={minDateValue}
                    max={maxDateValue}
                    disabledDates={weekendDisabled ? isDateDisabled : null}
                    firstDayOfWeek={firstDay}
                    showWeekNumbers={showWeekNumbers}
                    zoomLevel={zoomLevel}
                    cellRender={useCellTemplate ? CustomCell : null}
                />
            </div>
            <div className="optionsList">
                <div className="caption">Настройки</div>
                <div className="options">
                    <CheckBox
                        defaultValue={false}
                        text="Минимална дата"
                        onValueChanged={onMinDateChange}
                    />
                </div>
                <div className="options">
                    <CheckBox
                        defaultValue={false}
                        text="Максимална дата"
                        onValueChanged={onMaxDateChange}
                    />
                </div>
                <div className="options">
                    <CheckBox
                        defaultValue={false}
                        text="Без уикенд"
                        onValueChanged={onDisableWeekendChange}
                    />
                </div>
                <div className="options">
                    <CheckBox
                        defaultValue={false}
                        text="Показване на седмицата"
                        onValueChanged={onShowWeekNumbersChange}
                    />
                </div>
                <div className="options">
                    <CheckBox
                        defaultValue={false}
                        text="Специално оформление"
                        onValueChanged={onUseCellTemplateChange}
                    />
                </div>
                <div className="options">
                    <span>Първи ден за седмицата</span>
                    <SelectBox
                        dataSource={weekDays}
                        displayExpr="text"
                        valueExpr="id"
                        value={firstDay}
                        onValueChanged={onFirstDayChange}
                    />
                </div>
                <div className="options">
                    <span>Първоначален изглед</span>
                    <SelectBox
                        dataSource={zoomLevels}
                        value={zoomLevel}
                        onValueChanged={onZoomLevelChange}
                    />
                </div>
                <div className="options">
                    <span>Избиране на дата</span>
                    <DateBox
                        id="selected-date"
                        value={currentValue}
                        onValueChanged={onCurrentValueChange}
                        min={minDateValue}
                        max={maxDateValue}
                    />
                </div>
            </div>
        </div>
    );
}
