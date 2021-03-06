import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Dentist from '../models/dentist'

const availableFields = ['firstname', 'lastname', 'phone', 'treatments']
const schema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string().optional(),
    treatments: Joi.array().items(Joi.string())
})

export const list = async(req, res) => {
    try {
        const dentists = await Dentist.find({ deleted: false }).populate('treatments')

        respondResult(res)(dentists)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const dentist = await Dentist.findById({ deleted: false, _id }).populate('treatments')

        respondResult(res)(dentist)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const dentist = Joi.validate(req.body, schema).value

    try {
        const newDentist = await Dentist.create(dentist)

        respondResult(res)(newDentist)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const multiCreate = async(req, res) => {
    const list = req.body;

    try {
        list.forEach(element => {
            const item = Joi.validate(element, schema).value
            console.log(item);
            Dentist.create(item)

        });

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const dentist = await Dentist.findById({ _id })

        _.map(availableFields, (field) => {
            dentist[field] = body[field] || dentist[field]
        })
        dentist.save()

        respondResult(res)(dentist)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const dentist = await Dentist.findById({ _id })
        dentist.deleted = true
        dentist.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}