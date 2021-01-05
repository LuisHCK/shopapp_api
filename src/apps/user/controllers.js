'use-strict'
import { User } from './models'
import UserSchema from './schemas'
import status from 'http-status'
import validateRequest from '../../utils/validateRequest'

const PAGE_LIMIT = 50

export const index = async ({ req, res }) => {
    const { page, limit } = req.query

    try {
        const users = await User.paginate(
            {},
            { page, limit: limit || PAGE_LIMIT }
        ).exec()

        res.status(status.OK).json(users)
    } catch (error) {
        res.status(status.NOT_FOUND).json()
        console.error(err.stack)
    }
}

export const show = async ({ req, res }) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).exec()
        res.status(status.OK).json(user)
    } catch (error) {
        console.error(err.stack)
        res.status(status.NOT_FOUND).json()
    }
}

export const create = async ({ req, res, next }) => {
    validateRequest(req, res, next, UserSchema)
    const { body } = req

    try {
        const user = await User.create(body)
        res.json(user)
    } catch (error) {
        res.status(status.UNPROCESSABLE_ENTITY).json(error)
    }
}

export const update = async ({ req, res }) => {
    validateRequest(req, res, next, UserSchema)
    const { body } = request

    try {
        const user = await User.findByIdAndUpdate(id, { $set: body }).exec()
        res.status(status.OK).json(user)
    } catch (error) {
        res.status(status.UNPROCESSABLE_ENTITY).json(error)
    }
}

export const destroy = async ({ req, res }) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id).exec
        res.status(status.NO_CONTENT).json()
    } catch (error) {
        console.error(error)
        res.status(status.UNPROCESSABLE_ENTITY).json(error)
    }
}
