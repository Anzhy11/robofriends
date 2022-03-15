import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../component/Cardlist';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import './App.css'
import { setSearchField } from '../action'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

function App(props) {

    const [robots, setRobot] = useState([]);
    const { searchField, onSearchChange } = props;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => setRobot(user));
    }, [])

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <Cardlist robots={filteredRobots} />
                </Scroll>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)