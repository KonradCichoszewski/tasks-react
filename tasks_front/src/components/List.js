import './List.css';
import React from 'react';

function List(props) {
    return (
        <div className="list">{props.list.title}</div>
    )
}

export default List;