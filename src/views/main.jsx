'use babel';

import React from 'react';

import Date from './components/Date';
import Summary from './components/Summary';
import ItemList from './components/ItemList';

export default class Main extends React.Component {
    render() {
        return(
            <div>
                <div className="header">
                    <Date />
                    <Summary />
                </div>
                <ItemList />
            </div>
        )
    }
}
