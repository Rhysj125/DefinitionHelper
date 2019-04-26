import React, {Component} from 'react'
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import './App.css'
import DefinitionHelperPage from './pages/DefinitionHelperPage'

class App extends Component {

  renderDevelopment() {
    return(
      <Router>
        <header className="App-header">
          <Route path="/" exact={true} component={body} />
          <Route path="/Lilli" exact={true} component={DefinitionHelperPage} />
          <Route path="/definitions/:id" />
        </header>
      </Router>
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
    return this.renderDevelopment();
  }
}

const body = () => {
  return (
    <div>This is the body</div>
  )
}

export default App