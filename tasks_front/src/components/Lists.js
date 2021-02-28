import './Lists.css';
import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import { tryGettingLists, tryAddingList, changeCurrentList } from '../redux/actions/listsActions';

class Lists extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newList: ""
        }
    }

    componentDidMount(){
        this.props.tryGettingLists(this.props.token);
    }

    handleChange(e) {
        this.setState({ ...this.state, newList: e.target.value})
    }

    tryAddingList(e) {
        if (e.keyCode == 13 && this.state.newList.length) {
            this.props.tryAddingList(this.props.token, this.state.newList);
            this.setState({ newList: ""});
            this.props.tryGettingLists(this.props.token);
        }
    }

    render() {
        return (
            <div className="lists">
                <div className="login_header">My lists</div>
                <div className="lists_tile">
                    { this.props.lists.lists.map(list => <div key={list.id} onClick={() => this.props.changeCurrentList(list)}><List list={list}/></div>)}
                    <input className="lists_add" type="text"
                           placeholder="Create new task list..." value={this.state.newList}
                           onChange={this.handleChange.bind(this)}
                           onKeyDown={this.tryAddingList.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.lists,
        token: state.auth.token
    }
};


export default connect(mapStateToProps, { tryGettingLists, tryAddingList, changeCurrentList })(Lists);