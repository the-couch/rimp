# rimp
Small library for handling mailchimp subscriptions on the client side in react. This is
not a documented solution within mailchimp however it does still `work`

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Setup

You will need to grab the naked post url from the mailchimp embed form code

## Usage
Grid with four items:

```javascript
import Rimp from 'rimp'

<Rimp
  buttonValue={`submit`}
  buttonStyles={`btn`}
  containerStyles={`newsletter__form`}
  mailChimpUrl="//url.us10.list-manage.com/subscribe/post?u=user&amp;id=list"
 />
```

Configurable options:
```javascript
buttonValue: 'submit',
buttonStyles: 'button',
placeholder: 'enter your email address',
formWrapper: 'flex flex-justify-between flex-align-center',
containerStyles: 'newsletter__form',
helpText: 'Please provide a valid email address',
showError: true,
emailAddress: '',
mailChimpUrl: null
```




MIT License
