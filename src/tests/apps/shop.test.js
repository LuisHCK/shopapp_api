import request from 'supertest'
import app from '../../app'
import status from 'http-status'
import { disconnectMongoDB, removeAllCollections } from '../common'

beforeAll((done) => {
    done()
})

// afterAll(async () => {
//     await disconnectMongoDB()
// })

afterEach(async () => {
    // Clean database after each test
    await removeAllCollections()
})

describe('Test store creation for standard user', () => {
    test('It should CREATE a new shop', async () => {
        const response = await createShop()

        expect(response.statusCode).toBe(status.CREATED)
    })
})

// Utils

/**
 * Reusable store creation request
 * @param {Object} data
 * @returns {request.Test}
 */
const createShop = async (data = defaultShop) => {
    const token = await getUserJWT()

    return request(app)
        .post('/api/v1/shop/')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
}

const getUserJWT = async () => {
    const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(defaultUser)

    return response.body.token
}

const defaultUser = {
    email: 'jhon@doe.com',
    first_name: 'Jhon',
    last_name: 'Doe',
    password: 'foo',
}

const defaultShop = {
    name: 'My Shop',
    description: 'My brand new show :)',
    email: 'myshop@mydomain.com',
}
