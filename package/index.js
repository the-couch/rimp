import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reqwest from 'reqwest'

const { string } = PropTypes

export default class Rimp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonValue: props.buttonValue,
      buttonStyles: props.buttonStyles,
      containerStyles: props.containerStyles,
      placeholder: props.placeholder,
      inputStyles: props.inputStyles,
      formWrapper: props.formWrapper,
      completeMessage: props.completeMessage,
      valid: false,
      isTyping: false,
      showError: props.showError,
      helpText: props.helpText,
      mailChimpUrl: props.mailChimpUrl,
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.returnStyles = this.returnStyles.bind(this)
  }

  static get defaultProps () {
    return {
      buttonValue: 'submit',
      buttonStyles: 'button',
      placeholder: 'enter your email address',
      formWrapper: 'flex flex-justify-between flex-align-center',
      containerStyles: 'newsletter__form',
      completeMessage: 'Thanks for subscribing',
      helpText: 'Please provide a valid email address',
      showError: true,
      emailAddress: '',
      mailChimpUrl: null
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    let self = this
    let isValid = this.state.valid
    if (isValid) {
      reqwest({
        method: 'get',
        type: 'jsonp',
        contentType: 'application/json',
        url: this.state.mailChimpUrl,
        data: {EMAIL: this.state.emailAddress, STATUS: 'subscribed'},
        jsonpCallback: 'c'
      })
      .then(function (resp) {
        self.setState({
          submitted: true
        })
      })
      .fail(function (err, msg) {
        console.log(err)
        self.setState({
          submitted: true
        })
      })
      .always(function (resp) {
        self.setState({
          submitted: true
        })
      })
      self.setState({
        submitted: true
      })
    }
  }

  validateEmail (e) {
    this.setState({
      isTyping: true
    })
    function validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
    if (validateEmail(e.currentTarget.value)) {
      this.setState({
        valid: true,
        emailAddress: e.currentTarget.value
      })
    } else {
      this.setState({
        valid: false
      })
    }
  }

  returnStyles () {
    let styles = `${this.state.containerStyles}`
    if (this.state.isTyping) {
      styles += ` ${this.state.valid ? 'valid' : 'not-valid'}`
    }
    return styles
  }

  render () {
    return (
      <div className={this.returnStyles()}>
        {!this.state.submitted
          ? <div>
            <form onSubmit={this.handleSubmit} className={this.state.formWrapper}>
              <input type='email' onChange={this.validateEmail} ref='email' className={this.state.inputStyles} placeholder={this.state.placeholder} />
              <button className={this.state.buttonStyles}>{this.state.buttonValue}</button>
            </form>
            {this.state.showError
              ? <div>
                {!this.state.valid && this.state.isTyping
                  ? <div className='error'>{this.state.helpText}</div>
                : null}
              </div>
            : null}
          </div>
        : <p>{this.state.completeMessage}</p> }
      </div>
    )
  }
}

Rimp.propTypes = {
  mailChimpUrl: string.isRequired
}
