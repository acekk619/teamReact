import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Jumbotron } from 'react-bootstrap';
import App from './App'
import SignIn from './SignIn'
import { firebaseDb, firebaseAuth } from './firebase'
import './App.css'

class Top extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      text: '',
      auth: false,
      uid: null
    }
  }

  render () {
    let {
      text,
      auth
    } = this.state
    return (
      <div className='App'>
        
        <Jumbotron>
          <h1>Firebaseを利用したReactお小遣い帳アプリを考案してみたんだが</h1>
        </Jumbotron>
        
        <div className='App-main'>
          {
            auth
            ? <App
              handleInputChange={this.handleInputChange}
              inputValue={text}
              />
            : <SignIn
              signInAnonymously={this.signInAnonymously}
              />
          }
        </div>
      </div>
    )
  }

  async handleInputChange (e) {
    let { auth, uid } = this.state
    if (!auth) {
      throw new Error('Not sign in')
    }
    let text = e.target.value
    this.setState({ text })
    await firebaseDb.ref(`/texts/${uid}`).set({ text })
  }

  async signInAnonymously () {
    try {
      let result = await firebaseAuth.signInAnonymously()
      let { uid } = result
      let snapshot = await firebaseDb.ref(`/texts/${uid}`).once('value')
      let { text } = snapshot.val() || ''
      this.setState({
        auth: true,
        uid,
        text
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default Top