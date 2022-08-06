const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

describe('Test login controller', () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log('Database connection successful')
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`)
        })
      })
      .catch((error) => {
        console.log(`Server is not running. Error message: ${error.message}`)
        process.exit(1)
      })
  )

  test('login returns response status 200 and response body must contain a token ', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'kateryna@gmail.com',
      password: 'kg43v0096',
    })

    expect(response.status).toBe(200)
    expect(typeof response.body.token).toBe('string')
  })

  test('register returns response status 201 and response body must contain name, email and subscription type', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'donatelo',
      email: 'donatelo.ninja@gmail.com',
      password: 'kg43v0096',
    })
    const { name, email, subscription } = response.body
    expect(response.status).toBe(201)
    expect(typeof name).toBe('string')
    expect(typeof email).toBe('string')
    expect(typeof subscription).toBe('string')
  })
})
