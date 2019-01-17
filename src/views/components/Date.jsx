'use babel';

import React from 'react';

import { connect } from 'react-redux';
import { setDate } from '../actions.js';
import { getDate } from '../reducers/date.js';
import Moment from 'moment';

class Date extends React.Component {
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        this.setDate();
    }

    setDate() {
        const date = {
            day: Moment().date(),
            month: Moment().format('MMMM'),
            weekday: Moment().format('dddd'),
            time: Moment().format('LT')
        };

        this.props.setDate(date);
    }

    render() {
        return(
            <div className="date">
                <div className="calendar">
                    <div className="day">{this.props.date.day}</div>
                    <div className="ttm">
                        <div className="time">{this.props.date.time}</div>
                        <div className="today">{this.props.date.weekday}</div>
                        <div className="month">{this.props.date.month}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    date: getDate(state)
});

const mapDispatchToProps = dispatch => ({
    setDate: (date) => dispatch(setDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Date);
