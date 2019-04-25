import React, {Component} from 'react'
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import './App.css'

class App extends Component {

const

  renderDevelopment() {
    return(
      <header className="App-header">
        
      </header>
    )
  }

  renderMaintenance() {
    return(
      <header className="App-header">
        Undefined Games
        <br/>
        Currently Undefined
      </header>
    )
  }

  render() {

    if(process.env.NODE_ENV == "development"){
      return this.renderDevelopment()
    }else{
      return this.renderMaintenance()
    }
  }
}

export default App