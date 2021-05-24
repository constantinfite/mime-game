const { Schema, model } = require("mongoose")

const wordSchema = new Schema({
    playerName: {
        type: String
    },
    listWord: {
        type: Array
    },
    

})

const wordItem = model('Word', wordSchema)
module.exports = wordItem