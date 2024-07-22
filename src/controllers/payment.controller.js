const crypto = require('crypto');
const microtime = require('microtime');
require('dotenv').config();

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

const createPayment = async (req, res) => {
    // Müşteri bilgileri
    const email = "ahhmetkasap@gmail.com";
    const payment_amount = "200";
    const user_ip = "176.90.162.161";

    const basket = JSON.stringify([
        ['Örnek Ürün 1', '50.00', 1], // 1. ürün (Ürün Ad - Birim Fiyat - Adet)
        ['Örnek Ürün 2', '33.25', 2], // 2. ürün (Ürün Ad - Birim Fiyat - Adet)
        ['Örnek Ürün 3', '45.42', 1] // 3. ürün (Ürün Ad - Birim Fiyat - Adet)
    ]);

    const cc_owner = "test";
    const card_number = "4355084355084358";
    const expiry_month = "12";
    const expiry_year = "30";
    const cvv = "000";
    const merchant_oid = "IN" + microtime.now(); // Sipariş numarası
    const currency = 'TL';
    const test_mode = '0';
    const payment_type = 'card'; // Ödeme türü
    const non_3d = '0'; // 3D'siz işlem
    const installment_count = '0'; // Taksit Sayısı
    const user_name = "test";
    const user_address = 'test test test';
    const user_phone = '05555555555';
    const debug_on = 1;
    const client_lang = 'tr'; // Ödeme süreci dil seçeneği tr veya en
    const card_type = ''; // Alabileceği değerler; advantage, axess, combo, bonus, cardfinans, maximum, paraf, world, saglamkart

    // Token oluşturma
    const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}`;
    const paytr_token = hashSTR + merchant_salt;
    const token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

    const merchant_ok_url = 'http://www.siteniz.com/odeme_basarili.php';
    const merchant_fail_url = 'http://www.siteniz.com/odeme_hata.php';

    // Convert context to URL-encoded format
    const context = new URLSearchParams({
        merchant_id,
        user_ip,
        merchant_oid,
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
        user_phone,
        debug_on,
        client_lang,
        token,
        installment_count,
        card_type,
        user_basket: basket,
        cc_owner,
        card_number,
        expiry_month,
        expiry_year,
        cvv
    }).toString();

    try {
        const response = await fetch("https://www.paytr.com/odeme", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Correct content type
            },
            body: context
        });

        const responseBody = await response.text();
        console.log(responseBody);

        if (response.ok) {
            res.send('Payment request sent successfully.');
        } else {
            res.status(response.status).send(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


const callbackController = async(req,res) => {
 // ÖNEMLİ UYARILAR!
    // 1) Bu sayfaya oturum (SESSION) ile veri taşıyamazsınız. Çünkü bu sayfa müşterilerin yönlendirildiği bir sayfa değildir.
    // 2) Entegrasyonun 1. ADIM'ında gönderdiğniz merchant_oid değeri bu sayfaya POST ile gelir. Bu değeri kullanarak
    // veri tabanınızdan ilgili siparişi tespit edip onaylamalı veya iptal etmelisiniz.
    // 3) Aynı sipariş için birden fazla bildirim ulaşabilir (Ağ bağlantı sorunları vb. nedeniyle). Bu nedenle öncelikle
    // siparişin durumunu veri tabanınızdan kontrol edin, eğer onaylandıysa tekrar işlem yapmayın. Örneği aşağıda bulunmaktadır.

    var callback = req.body;

    paytr_token = callback.merchant_oid + merchant_salt + callback.status + callback.total_amount;
    var token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

    // Oluşturulan hash'i, paytr'dan gelen post içindeki hash ile karşılaştır (isteğin paytr'dan geldiğine ve değişmediğine emin olmak için)
    // Bu işlemi yapmazsanız maddi zarara uğramanız olasıdır.

    if (token != callback.hash) {
        throw new Error("PAYTR notification failed: bad hash");
    }

    if (callback.status == 'success') {
        // basarili
    } else {
        /// basarisiz
    }

    res.send('OK');  // Bildirimin alındığını PayTR sistemine bildir.  

}




module.exports = {
    createPayment,callbackController
    
};




