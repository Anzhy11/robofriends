import React, { useState, useEffect } from 'react';
import Cardlist from '../component/Cardlist';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import './App.css'


function App() {

    const [robots, setRobot] = useState([]);
    const [searchfield, setSearchfield] = useState('');


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => setRobot(user));
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
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

export default App