import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  MainContainer,
  LoginCon,
  InputElement,
  LabelElement,
} from './loginStyledComponents'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPassword: 'password',
    errorDisplay: false,
    errorMsg: '',
  }

  sucessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  failureLogin = errorMsg1 => {
    this.setState({errorMsg: errorMsg1, errorDisplay: true})
  }

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = event => {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.setState({showPassword: 'text'})
    } else {
      this.setState({showPassword: 'password'})
    }
  }

  submitFun = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userData)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.sucessLogin(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.failureLogin(data.error_msg)
    }
  }

  renderLoginPage = () => {
    const {
      showPassword,
      errorMsg,
      username,
      password,
      errorDisplay,
    } = this.state
    console.log(username, password)

    return (
      <MainContainer>
        <LoginCon onSubmit={this.submitFun}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="loginPage"
            className="loginImage"
          />
          <div className="loginInputCon">
            <LabelElement htmlFor="username"> USERNAME</LabelElement>
            <InputElement
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.onUserName}
            />
          </div>
          <div className="loginInputCon">
            <LabelElement htmlFor="password"> PASSWORD</LabelElement>
            <InputElement
              type={showPassword}
              id="password"
              placeholder="Password"
              onChange={this.onPassword}
            />
          </div>
          <div className="checkBoxCon">
            <input
              type="checkbox"
              id="showpassword"
              onClick={this.onShowPassword}
              className="showPassword"
            />
            <LabelElement htmlFor="showpassword">Show Password</LabelElement>
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          {errorDisplay && <p className="errorMsg">*{errorMsg}</p>}
        </LoginCon>
      </MainContainer>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}

export default LoginRoute
