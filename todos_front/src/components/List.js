import './Lists.css';
import React from 'react';

class Lists extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>{this.props.list}</div>
        )
    }
}

export default Lists;