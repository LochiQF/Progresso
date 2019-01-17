'use babel';

import React from 'react';

import { connect } from 'react-redux';
import { addItem, updateItem, deleteItem, resetAll } from '../actions.js';
import { getAllItems, getPendingItems, getCompletedItems, getPausedItems } from '../reducers/item-list.js';

import Item from './Item';
import Progress from './Progress';

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.pauseItem = this.pauseItem.bind(this);
    }

    addItem(e) {
        var text = this._inputElement.value;
        text = text.split(':');

        var itemName = '';
        var groupName = '';

        if(text.length !== 1) {
            groupName = text[0].trim().slice(0, 4).toUpperCase();

            itemName = text[1].trim();
        }
        else {
            groupName = "NEW"

            itemName = text[0].trim();
        }

        const newItem = {
            text: itemName,
            group: groupName,
            key: Date.now(),
            status: 'pending'
        };

        if (!!newItem.text.trim()) {
            this.props.addItem(newItem);
        }

        e.preventDefault();
        this._inputElement.value = '';
        this._inputElement.focus();
    }

    completeItem(item) {
        const completedItem = Object.assign({}, item, {
            status: 'complete'
        });

        this.props.updateItem(completedItem);
    }

    pauseItem(item) {
        const pausedItem = Object.assign({}, item, {
            status: 'paused'
        });

        this.props.updateItem(pausedItem);
    }

    renderProgress() {
        const completedAmount = this.props.completedItems.length;
        const pausedAmount = this.props.pausedItems.length;
        const totalAmount = this.props.allItems.length;

        let completedPercentage = completedAmount/totalAmount;
        let pausedPercentage = (pausedAmount/totalAmount) + completedPercentage;

        if (isNaN(completedPercentage)) {
            completedPercentage = 0;
        }

        if (isNaN(pausedPercentage)) {
            pausedPercentage = 0;
        }

        return (
            <Progress completed={completedPercentage} paused={pausedPercentage} />
        );
    }

    renderReset() {
        const completedAmount = this.props.completedItems.length;
        const pausedAmount = this.props.pausedItems.length;

        if (completedAmount > 0 || pausedAmount > 0) {
            return (
                <div className="reset">
                    <button onClick={this.props.resetAll}>Reset progress</button>
                </div>
            );
        }
    }

    renderPaused() {
        const pausedItems = this.props.pausedItems;

        if (pausedItems !== undefined && pausedItems.length > 0) {
            return (
                <div>
                <h2>In pause</h2>
                {
                    pausedItems && pausedItems.map(item => {
                        return (
                            <Item
                            item={item}
                            text={item.text}
                            group={item.group}
                            status={item.status}
                            key={item.key}
                            onComplete={this.completeItem}
                            onDelete={this.props.deleteItem}
                            paused={true}
                            />
                        );
                    })
                }
                </div>
            );
        }
    }

    renderActive() {
        const { pendingItems } = this.props;
        var groups = pendingItems.map(item => item.group).filter(onlyUnique);

        return (
            <div className="groups">
            {
                groups.map(group => {
                    return (
                        <div className="group"><span className="group-label">{group}</span>
                        {
                            pendingItems.filter(item => item.group === group).map(res => {
                                return (
                                    <Item
                                    item={res}
                                    text={res.text}
                                    group={res.group}
                                    status={res.status}
                                    key={res.key}
                                    onComplete={this.completeItem}
                                    onPause={this.pauseItem}
                                    onDelete={this.props.deleteItem}
                                    paused={false}
                                    />
                                );
                            })
                        }
                        </div>
                    );
                })
            }
            </div>
        );
    }

    render() {
        return (
            <div className="item-list">
            {this.renderProgress()}
            <form className="form" onSubmit={this.addItem}>
                <input
                ref={(a) => this._inputElement = a}
                placeholder="Add new item"
                autoFocus
                />
                <button type="submit"/>
            </form>
            {this.renderActive()}
            {this.renderPaused()}
            {this.renderReset()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allItems: getAllItems(state),
    pendingItems: getPendingItems(state),
    completedItems: getCompletedItems(state),
    pausedItems: getPausedItems(state)
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    updateItem: item => dispatch(updateItem(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    resetAll: item => dispatch(resetAll(item))
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
