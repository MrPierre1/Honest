import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user_id: '',
      email: '',
      name: '',
      password: '',
      file: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectedFile (event) {
    this.setState({
      file: event.target.files[0]
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const userData = {
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      file: this.state.file
    }
    console.log('sending data to parent', userData, this.state.name)

    var formInfo = new FormData()
    formInfo.append('name', userData.name)
    formInfo.append('email', userData.email)
    formInfo.append('password', userData.password)
    formInfo.append('file', userData.file)
    axios({
      method: 'post',
      url: 'http://localhost:3000/user/signup',
      data: formInfo,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(response => {
        console.log('server response returned', response)
        if (response.status === 201) {
          localStorage.setItem('token', JSON.stringify(response.data))
          this.setState({ isAuthenticated: true })
          this.props.history.push('/home')
        }
      })
      .catch(error => {
        console.log('There were errors', error)
      })

  // this.props.onClick(userData)
  }
  render () {
    return (
      <div>
        <div>
          <h1 className='center-align'>SignUp <button className='btn waves-effect waves-light btn-large white-text'> <Link to='/login' className='white-text'> Login </Link> </button></h1>
          <form onSubmit={this.handleSubmit} className='container'>
            <input
              type='text'
              id='user_id'
              name='user_id'
              placeholder='UserID'
              onChange={this.handleChange}
              value={this.state.user_id} />
            <label>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
              value={this.state.email} />
            <label>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Name'
              onChange={this.handleChange}
              value={this.state.name} />
            <label>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
              value={this.state.password} />
            {/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <div className='App'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  type='file'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  name='file'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  id='file'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  onChange={this.handleSelectedFile} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */}
            <div className='file-field input-field'>
              <div className='btn'>
                <span>File</span>
                <input
                  type='file'
                  name='file'
                  id='file'
                  onChange={this.handleSelectedFile} />
              </div>
              <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' />
              </div>
            </div>
            <button className='btn waves-effect waves-light' type='submit' name='action'>
              Submit
              <i className='material-icons right'>send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUpForm
