const hostModel = require('../models/host.model')
const userModel = require('../models/user.model')
const reservationModel = require('../models/reservation.model')
const Response = require('../utils/Response')
const APIError = require('../utils/Error')
const sendMail = require('../helpers/sendMail')
const schedule = require('node-schedule')
const amqp = require('amqplib')
const rabbitmqConnection = require('../services/RabbitMQ/RabbitMQ.connection')




const validationReservationController = async(req,res) => {
    const hostId = req.params.id
    const host = await hostModel.findById(hostId)
    if(!host) return new Response(null, 'host not found').notfound(res)
    
    const validStartDate = new Date(req.body.startDate)
    const validEndDate = new Date(req.body.endDate)
    const now = new Date()

    if((validStartDate.getTime()>validEndDate.getTime()) || (now >validStartDate.getTime())) return new Response(null,'check the selected date settings').badRequest(res)
    
    const hostStatusControl = host.status
    if(hostStatusControl == 'active') return new Response(null, 'this host is currently unavailable').ok(res)

    return new Response(host, 'this host can be booked').ok(res)
}


const createResarvationController = async(req,res) => {

    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)

    const hostId = req.params.id
    const host = await hostModel.findById(hostId)
    if(!host) return new Response(null, 'host not found').notfound(res)
    
    const validStartDate = new Date(req.body.startDate)
    const validEndDate = new Date(req.body.endDate)
    const now = new Date()

    if((validStartDate.getTime()>validEndDate.getTime()) || (now >validStartDate.getTime())) return new Response(null,'check the selected date settings').badRequest(res)
    
    const hostStatusControl = host.status
    if(hostStatusControl == 'active') return new Response(null, 'this host is currently unavailable').ok(res)

    
    //? redirect payment controller
    const data = {
        host,
        validStartDate,
        validEndDate
    }

    const reservationRabbitMQ = async () => {
        const connection = await rabbitmqConnection()
        const chanel = await connection.createChannel()     
        await chanel.assertQueue('reservationQueue')              
    
        chanel.sendToQueue('reservationQueue', Buffer.from(JSON.stringify(data)))   
    }
    await reservationRabbitMQ()
    return new Response(null, "you are redirected to the payment page").ok(res)


}

const reservationConfirmationController = async(req,res) =>{
    const user = await userModel.findById(req.authUser._id)

    const paymentResultRabbitMQ = async () => {
        const connection = await rabbitmqConnection()
        const chanel = await connection.createChannel()    
        await chanel.assertQueue('paymentResultQueue')              
    
        chanel.consume('paymentResultQueue', async (response) => {               
            const responseData = response.content.toString()
            const data = JSON.parse(responseData);
            const host = data.host
            const validEndDate = data.validEndDate
            const validStartDate = data.validStartDate

            if(data.message !=="success") {
                chanel.ack(response)  
                throw new APIError('error in payment information', 400)
            }

            // confirmation reservation
            const reservation = new reservationModel({
                userRef : user._id,
                hostRef : host._id,
                startDate : validStartDate,
                endDate : validEndDate,
                status : 'confirmed'
            })
            const result = await reservation.save()
            if(result) {
                await hostModel.findByIdAndUpdate(host._id, {status:"active"})
        
                try {
                    schedule.scheduleJob(validEndDate, async () => {
                        await reservationModel.findByIdAndUpdate(result._id, { status: 'pending' })
                        await hostModel.findByIdAndUpdate(host._id, { status: 'passive' })
                    })
                    
                } catch (error) {
                    throw new APIError('reservation and host status not updated', 500)
                }
                chanel.ack(response)  
                return new Response(null, 'reservation created successfully').created(res)
            }
        })

    }
    
    await paymentResultRabbitMQ()
}


const editReservationController = async(req,res) => {

}

const cancelReservationController = async(req,res) => {

}

const getReservationController = async(req,res) => {

}




module.exports = {
    validationReservationController,
    createResarvationController,
    reservationConfirmationController,
    editReservationController,
    cancelReservationController,
    getReservationController
}