import React from 'react'
import { firebaseAuth } from './firebase'
//import './SignIn.css'

// 入力コンポーネント
class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = { inputEmail: "", inputPassword: "" };
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }
  
  signInAnonymously () {
    try {
      let result = firebaseAuth.signInWithEmailAndPassword(this.state.inputEmail, this.state.inputPassword).catch(function(error) {
            alert('ログインできません（' + error.message + '）');
        })
      let value = true

      this.setState({auth: value, uid: result})
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    return (
      <div>
    <div className='SignIn-wrap'>
      <h1 className='SignIn-title'>Sign in</h1>
      <input type="text" 
        className="email" id="email" name="inputEmail" 
        value={this.state.inputEmail} onChange={this.handleInputChange}/>
      <input type="password" 
        className="password" id="password" name="inputPassword" 
        value={this.state.inputPassword} onChange={this.handleInputChange}/>
      <button
        className='SignIn-button'
        onClick={this.signInAnonymously}
        type='button'>
        ログイン
      </button>
    </div>
  </div>
    )
  }

}


export default SignIn
