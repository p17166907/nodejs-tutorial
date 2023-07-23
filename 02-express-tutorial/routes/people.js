const express = require('express')
const router = express.Router()

let people = require('../data')

router.get('/', (req, res) => {
    return res.status(200).json({ success: true, data: people })
})

router.post('/', (req, res) => {
    console.log(req.body)
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    }
    return res.status(201).json({ success: true, person: name })
})

router.post('/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    }
    return res.status(201).send({ success: true, data: [...people, name] })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide a name' })
    }

    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `No person with id: ${id}` })
    }
    person.name = name

    return res.status(200).json({ success: true, data: people })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `No person with id: ${id}` })
    }

    const newPeople = people.filter((person) => person.id !== Number(id))

    return res.status(200).json({ success: true, data: newPeople })
})

module.exports = router
