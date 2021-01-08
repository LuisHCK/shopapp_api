import request from 'supertest'
import app from '../../app'
import { TestSchema } from '../../apps/user/schemas'
import { disconnectMongoDB, removeAllCollections } from '../common'

const defaultUser = {
    email: 'jhon@doe.com',
    first_name: 'Jhon',
    last_name: 'Doe',
    password: 'foo',
}

beforeAll((done) => {
    done()
})

// afterAll(() => {
//     disconnectMongoDB()
// })

afterEach(async () => {
    // Clean database after each test
    removeAllCollections()
})

/**
 * USER SING UP
 */
describe('Test user sign-up', () => {
    test('It should FAIL with empty data', async () => {
        const response = await request(app).post('/api/v1/auth/sign-up')

        expect(response.statusCode).toBe(422)
    })

    test('It should CREATE a new user', async () => {
        const response = await createUser()

        expect(response.statusCode).toBe(201)
    })

    test('It should FAIL if there are duplicates', async () => {
        const response1 = await createUser()

        expect(response1.statusCode).toBe(201)

        const response2 = await createUser()

        expect(response2.statusCode).toBe(422)
    })

    test('It should return a valid user object', async () => {
        const response = await createUser()

        const { error } = TestSchema.validate(response.body.user)

        expect(response.statusCode).toBe(201)
        expect(response.body.token).not.toBeNull()
        expect(error).toBeFalsy()
    })
})

/**
 * USER LOGIN
 */
describe('Test user login', () => {
    test('It should FAIL with wrong email', async () => {
        // Create the user
        const signUpResponse = await createUser()

        expect(signUpResponse.statusCode).toBe(201)

        const loginResponse = await loginUser({
            email: 'wrong@email.com',
            password: 'foo',
        })

        expect(loginResponse.statusCode).toBe(404)
    })

    test('It should FAIL with wrong password', async () => {
        const signUpResponse = await createUser()

        expect(signUpResponse.statusCode).toBe(201)

        const loginResponse = await loginUser({
            email: defaultUser.email,
            password: 'foo-wrong',
        })

        expect(loginResponse.statusCode).toBe(404)
    })

    test('It should LOGIN with correct credentials', async () => {
        const signUpResponse = await createUser()

        expect(signUpResponse.statusCode).toBe(201)

        const loginResponse = await loginUser()

        expect(loginResponse.statusCode).toBe(200)
        expect(loginResponse.body.user).not.toBeUndefined()
        expect(loginResponse.body.token).not.toBeUndefined()
    })
})

// Helpers

/**
 * Create a new user
 * @param {Object} data User data
 * @returns {request.Test}
 */
const createUser = (data) => {
    return request(app)
        .post('/api/v1/auth/sign-up')
        .send(data || defaultUser)
}

/**
 * Login user with credentials
 * @param {Object} data user credentials
 * @returns {request.Test}
 */
const loginUser = (data) => {
    const credentials = data || {
        email: defaultUser.email,
        password: defaultUser.password,
    }

    return request(app).post('/api/v1/auth/login').send(credentials)
}
