const express = require('express')

const app = express()

function generatePass({ size, withSpecialCharacter, withNumber }) {
  let chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
  if ( withNumber ) {
    chars += '1234567890'
  }

  if ( withSpecialCharacter ) {
    chars += '!#$%&()*/:;<=>?@'
  }

  let c = 0
  let result = ''
  while (size > c) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
    c++
  }
  return result
}

app.get('/home', (request, response) => {
  return response.json({
    message: 'home'
  })
})

app.get('/generate-pass', (request, response) => {
  const { 
    size, withSpecialCharacter, withNumber
  } = request.query
  const pass = generatePass({ size, withNumber, withSpecialCharacter })

  return response.json({
    pass,
  })
})

app.listen(3000, () => {
  console.log('app running at http://localhost:3000')
})