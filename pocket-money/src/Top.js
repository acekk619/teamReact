import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Jumbotron } from 'react-bootstrap';
import App from './App'
import SignIn from './SignIn'
import './App.css'

class Top extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      auth: false,
      uid: null
    }
  }

  render () {
    let {
      auth
    } = this.state
    return (
      <div className='App'>
        
        <Jumbotron>
          <h1>Firebaseを利用したReactお小遣い帳アプリを考案してみたんだが</h1>
        </Jumbotron>
        
        <div className='App-main'>
          <App />
        </div>
      </div>
    )
  }

}

export default Top