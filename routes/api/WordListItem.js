const { Router } = require('express')

const SensorDataItem = require('../../models/WordDataItem')

const router = Router()

/*router.get('/', async (req, res) => {
    try {
        const sensorDataItems = await SensorDataItem.find()
        if (!sensorDataItems) throw new Error('No data')
        const sorted = sensorDataItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})*/

router.post('/', async (req, res) => {
    console.log(req.body)
    const newPlayerItem = new SensorDataItem({
        playerName: req.body.name,
        listWord: req.body.list,
    }
    )
    try {
        const WordList = await newPlayerItem.save()
        if (!WordList) throw new Error('Something wrong saving the data')
        res.status(200).json(WordList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router