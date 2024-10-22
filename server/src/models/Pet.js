const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String
    },
    age: {
        type: Number
    },
    weight: {
        type: Number
    },
    profileImage: {
        type: String
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    behaviorDiary: [{
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String
        }
    }]
}, {
    timestamps: true // Cria os campos createdAt e updatedAt automaticamente
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
