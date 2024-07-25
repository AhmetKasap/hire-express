const crypto = require('crypto');
const microtime = require('microtime');
const APIError = require('../utils/Error');
require('dotenv').config()
const amqp = require('amqplib')
const rabbitmqConnection = require('../services/RabbitMQ/RabbitMQ.connection')
const Response = require('../utils/Response')


const createPayment = async(req,res) => {
    const paymentRabbitMQ = async () => {
        const connection = await rabbitmqConnection()
        const chanel = await connection.createChannel()           
        await chanel.assertQueue('reservationQueue')
        await chanel.assertQueue('paymentResultQueue')
        
        chanel.consume('reservationQueue', (response) => {               
            const result = response.content.toString()
            console.log(result)
            const data = JSON.parse(result);
            const host = data.host
            const validEndDate = data.validEndDate
            const validStartDate = data.validStartDate

            
            const paymentSuccess = true

            if(paymentSuccess === true) {
                chanel.ack(response) 
                chanel.sendToQueue('paymentResultQueue', Buffer.from(JSON.stringify({
                    host, 
                    message: 'success',
                    validEndDate,
                    validStartDate
                })))

                return new Response(null, 'payment successful, confirming reservation...').ok(res)
            }

        })
    
    }
    
    await paymentRabbitMQ()

}


module.exports = {
    createPayment
}



/*
PAYTR ENTEGRASYONU (CANLI UYGULAMA DA KULLANILABİLİR.)

const merchant_id = process.env.MERCHANT_ID
const merchant_key = process.env.MERCHANT_KEY
const merchant_salt = process.env.MERCHANT_SALT

const createPayment = async (req, res) => {
    const no_installment = "0"
    const max_installment = "0"
    const installment_count = "4" // Taksit Sayısı
    const lang = "tr"

    const user_ip = ""
    const merchant_oid = "IN" + microtime.now() // Sipariş numarası
    const email = ""
    const payment_amount = "" // ödeme tutarı
    const payment_type = 'card' // Ödeme türü
    const currency = 'TL'
    const test_mode = '1'
    const non_3d = '0' // 3D'siz işlem

    const cc_owner = "test"
    const card_number = "4355084355084358"
    const expiry_month = "12"
    const expiry_year = "30"
    const cvv = "000"
    const user_name = "PayTR Test"
    const user_address = 'test test test'
    const user_phone = '05555555555'
    const debug_on = 1
    const client_lang = 'tr' // Ödeme süreci dil seçeneği tr veya en
    const card_type = 'combo' // Alabileceği değerler; advantage, axess, combo, bonus, cardfinans, maximum, paraf, world, saglamkart

    // Token oluşturma
    const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}`;
    const paytr_token = hashSTR + merchant_salt;
    const token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

    const basket = JSON.stringify([
        ['Örnek Ürün 1', '50.00', 1], // 1. ürün (Ürün Ad - Birim Fiyat - Adet)
        ['Örnek Ürün 2', '33.25', 2], // 2. ürün (Ürün Ad - Birim Fiyat - Adet)
        ['Örnek Ürün 3', '45.42', 1] // 3. ürün (Ürün Ad - Birim Fiyat - Adet)
    ])

    const merchant_ok_url = 'http://13.60.168.51/success'
    const merchant_fail_url = 'http://13.60.168.51/error'

    const context = new URLSearchParams({
        merchant_id,
        user_ip,
        merchant_oid,
        no_installment,
        email,
        payment_type,
        payment_amount,
        currency,
        test_mode,
        non_3d,
        merchant_ok_url,
        merchant_fail_url,
        user_name,
        user_address,
        max_installment,
        user_phone,
        debug_on,
        client_lang,
        lang,
        paytr_token: token,
        installment_count,
        card_type,
        user_basket: basket,
        cc_owner,
        card_number,
        expiry_month,
        expiry_year,
        cvv
    }).toString();

    const response = await fetch("https://www.paytr.com/odeme", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" // Correct content type
        },
        body: context
    });

    if (response.status === 200) res.send('okey')

}

const paymentCallback = async (req, res) => {
    const callback = await req.body

    paytr_token = callback.merchant_oid + merchant_salt + callback.status + callback.total_amount;
    const token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

    if (token != callback.hash) {
        throw new APIError("PAYTR notification failed: bad hash", 401)
    }

    if (callback.status == 'success') {
        // basarili
    } else {
        /// basarisiz
    }

    res.send('OK')  // Bildirimin alındığını PayTR sistemine bildir.  
}

*/










