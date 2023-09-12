const express = require('express')

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,} = require("./cars-middleware")
// DO YOUR MAGIC

const router = express.Router()
const Car = require('./cars-model')

router.get('/', async (req, res, next) => {
    try{
        const cars = await Car.getAll()
        res.json(cars)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.json(req.car);
      } catch (err) {
        next(err);
      }
})

router.post('/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    async (req, res, next) => {
    try{
        const car = await Car.create(req.body)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

module.exports = router