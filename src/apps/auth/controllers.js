import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import status from 'http-status'
import { User } from '../user/models'
import UserSchema, { LoginSchema } from '../user/schemas'
import validateRequest from '../../utils/validateRequest'

/**
 * Create a new user
 * @param {Object} param0 Express Request, Response, Next
 */
export const signUp = async ({ req, res }) => {
    const { body } = req

    try {
        const data = validateRequest(body, UserSchema)

        // Check if user exists
        if (await userExists(data.email)) {
            throw [{ email: 'Another user with same email already exists' }]
        }

        // Hash plain password
        const passwordDigest = hashPassword(body.password)

        const createdUser = await User.create({
            ...data,
            password_digest: passwordDigest,
        })

        const user = { ...createdUser.toObject() }
        delete user.password_digest

        // Geneate jwt
        const token = generateJWT(user)

        res.status(status.CREATED).json({ user, token })
    } catch (err) {
        res.status(status.UNPROCESSABLE_ENTITY).json({ errors: err })
    }
}

export const login = async ({ req, res, next }) => {
    const { body } = req

    try {
        const data = validateRequest(body, LoginSchema)

        const user = await User.findOne({ email: data.email })
            .select('password_digest')
            .exec()

        const validPassword = comparePassword(
            data.password,
            user.password_digest
        )

        if (validPassword) {
            const token = generateJWT(user)

            res.status(status.OK).json({ user, token })

            // Response unauthorized if password doesn't match
        } else {
            // TODO: Localize response
            return res
                .status(status.NOT_FOUND)
                .json({ error: 'User not found' })
        }
    } catch (error) {
        // TODO: Localize response
        res.status(status.NOT_FOUND).json({ error: 'User not found' })
    }
}

// HELPER METHODS

/**
 * Generate Hash from plain text password
 * @param {String} plainPassword Plain text password to hash
 * @returns Strings
 */
const hashPassword = (plainPassword) => {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    return bcrypt.hashSync(plainPassword, saltRounds)
}

/**
 * Check if plain password hash matches with stored userd password hash
 * @param {String} plainPassword Plain password from login form
 * @param {String} hash Hashed password from user model
 * @returns Boolean
 */
const comparePassword = (plainPassword, hash) =>
    bcrypt.compareSync(plainPassword, hash)

/**
 * Generate JWT token with user id
 * @param {Object} user User instance
 * @param {Object} config Optional config for JWT sign
 * @returns String
 */
const generateJWT = (user, config = {}) =>
    jwt.sign(
        {
            user_id: user._id,
            // Set expiration date of token. 24h by default
            exp:
                Math.floor(Date.now() / 1000) +
                Number(process.env.TOKEN_VALIDITY),
        },
        process.env.SECRET_KEY,
        { ...config }
    )

/**
 * Check if an user with same email already exists
 * @param {String} email User's email
 * @returns Boolean
 */
const userExists = async (email) => {
    const users = await User.find({ email })
    return users.length > 0
}
