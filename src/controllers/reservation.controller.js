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

    //ödeme sayfasına yönlenmeli 

    const reservationRabbitMQ = async () => {
        const connection = await rabbitmqConnection()
        const chanel = await connection.createChannel()     //* rabbitmq ile bağlantı kurmak için kanal oluşturduk
        await chanel.assertQueue('reservationQueue')              //* 
    
        chanel.sendToQueue('reservationQueue', Buffer.from(JSON.stringify(host))) //* host değişkenini bufer tipine çevirip kuyruğa gönderiyoruz. reservationQueue'yi channel(kanalı) aracılığıyla kuğruga gönderiyoruz.
        return new Response(null, "ödeme sayfasına yönlendiriliyorsunuz").ok(res)
    }
    await reservationRabbitMQ()

    /*
    // create reservation
    const reservation = new reservationModel({
        userRef : user._id,
        hostRef : hostId,
        startDate : validStartDate,
        endDate : validEndDate,
        status : 'confirmed'
    })
    const result = await reservation.save()
    if(result) {
        await hostModel.findByIdAndUpdate(hostId, {status:"active"})

        try {
            schedule.scheduleJob(validEndDate, async () => {
                await reservationModel.findByIdAndUpdate(result._id, { status: 'pending' })
                await hostModel.findByIdAndUpdate(hostId, { status: 'passive' })
            })
            
        } catch (error) {
            throw new APIError('reservation and host status not updated', 500)
        }
        
        return new Response(null, 'reservation created successfully').created(res)
    }
     */
    
    

}

const reservationConfirmationController = async(req,res) =>{
    const paymentResultRabbitMQ = async () => {
        const connection = await rabbitmqConnection()
        const chanel = await connection.createChannel()     //* rabbitmq ile bağlantı kurmak için kanal oluşturduk
        await chanel.assertQueue('paymentResultQueue')              //* 
    
        chanel.consume('paymentResultQueue', (response) => {               //* messageQue chanell(kanalı) aracılğıyla kuyruktan gelen mesajı yakalıyoruz.
            const result = response.content.toString()
            const data = JSON.parse(result);
            const host = JSON.parse(data.host)

            if(data.message==="success") {
                console.log(" burada artık reservasyonu onaylayacağız",host._id)
            }

            chanel.ack(response)  //* kuyruktan gelen messaj okundu olarak işaretleniyor.s
        })

        
    }
    
    await paymentResultRabbitMQ()
}




module.exports = {
    validationReservationController,
    createResarvationController,
    reservationConfirmationController
}