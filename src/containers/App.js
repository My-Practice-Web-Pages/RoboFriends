import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css' //When adding a whole file like a css file, you do not destructure, but simply add file.

class App extends Component {
    constructor(){
        super()
        this.state = {      // State can be Re-Assigned like a variable using this.setState({key: new value});
            robots:[],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
        .then(users=>this.setState({robots:users}));
    }
    
    // Note- robots from another Component got added to this Component.
    onSearchChange=(event)=>{
        this.setState({searchfield: event.target.value}) // Re-Assigning value just like a variable, except with a STATE.
        // Was abble to Re-Assign searchfield because inside this function lives the event variable to use and mutate STATE.
        // Changing the state inside this function so it can always be updating each time there's an event happening.
    }

    render(){
        const filteredRobots = this.state.robots.filter(robots=>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase()); //determines if true/false.
        // Whatever is true from the filter method, it will return a new array with the passed results.
        // toLowerCase() method will convert a string to lowercase letters. Does not change original. 
        // includes() method determines whether a string contains the character of a specified string. True/False Value.
        // The reason why toLowerCase() was used twice is because the robot's object content was lower cased and the
        // search field's input tag is also lower cased so that there will be a solid comparison between the two.
        })
        if(this.state.robots.length === 0){
            return <h1>Loading...</h1>
        } else{
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;

