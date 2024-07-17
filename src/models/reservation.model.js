const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hostRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
})

const Reservation = mongoose.model('reservation', reservationSchema)

module.exports = Reservation