import './Lists.css';
import React from 'react';
import List from './List';

class Lists extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let lists = [];
        for (let list in this.props.lists) {
            lists.push(<List list={list} />)
        }

        return (
            <div className="lists">
                <div className="login_header">My lists</div>
                <div className="login_tile">
                </div>
            </div>
        )
    }
}

export default Lists;