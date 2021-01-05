
const validateRequest = (body, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    }

    const { error, value } = schema.validate(body, options)

    if (error) {
        throw error.details
    } else {
        return value
    }
}

export default validateRequest
