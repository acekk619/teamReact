import React from 'react'
//import './SignIn.css'

const SignIn = ({ signInAnonymously }) => (
  <div>
    <div className='SignIn-wrap'>
      <h1 className='SignIn-title'>Sign in</h1>
      <button
        className='SignIn-button'
        onClick={signInAnonymously}
        type='button'>
        Signin Anonymously
      </button>
    </div>
  </div>
)

export default SignIn