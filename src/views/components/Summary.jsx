'use babel';

import React from 'react';

import { connect } from 'react-redux';
import { getPendingItems, getCompletedItems, getPausedItems } from '../reducers/item-list.js';

class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="summary">
                <div className="data">
                    <div className="all">Tasks:
                        <span className="summary-value">{this.props.pendingItems.length}</span>
                    </div>
                    <div className="completed">Completed:
                        <span className="summary-value">{this.props.completedItems.length}</span>
                    </div>
                    <div className="paused">Paused:
                        <span className="summary-value">{this.props.pausedItems.length}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pendingItems: getPendingItems(state),
    completedItems: getCompletedItems(state),
    pausedItems: getPausedItems(state)
});

export default connect(mapStateToProps)(Summary);
