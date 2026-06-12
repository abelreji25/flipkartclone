import paytmchecksum from '../paytm/PaytmChecksum.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { paytmParams, paytmMerchantkey } from '../index.js';
import formidable from 'formidable';
import https from 'https';



export const addPaymentGateway = async (request, response) => {
    const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
    try {
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.log(error);
    }
}

export const paymentResponse = (request, response) => {
    const form = new formidable.IncomingForm();
    
    form.parse(request, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return response.redirect('http://localhost:3000/');
        }

        let paytmCheckSum = fields.CHECKSUMHASH;
        
        // Handle newer formidable versions which return arrays
        if (Array.isArray(paytmCheckSum)) paytmCheckSum = paytmCheckSum[0];

        // Fallback if express already parsed it into body
        if (!paytmCheckSum && request.body && request.body.CHECKSUMHASH) {
            fields = {...request.body};
            paytmCheckSum = fields.CHECKSUMHASH;
        }

        if (!paytmCheckSum) {
            console.error("Checksum is missing in the response");
            return response.redirect('http://localhost:3000/');
        }

        delete fields.CHECKSUMHASH;

        const isVerifySignature = paytmchecksum.verifySignature(fields, paytmMerchantkey, paytmCheckSum);
        if (isVerifySignature) {
            let paytmParams = {};
            paytmParams["MID"] = Array.isArray(fields.MID) ? fields.MID[0] : fields.MID;
            paytmParams["ORDERID"] = Array.isArray(fields.ORDERID) ? fields.ORDERID[0] : fields.ORDERID;

            paytmchecksum.generateSignature(paytmParams, paytmMerchantkey).then(function (checksum) {
                paytmParams["CHECKSUMHASH"] = checksum;
                const post_data = JSON.stringify(paytmParams);

                const options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                let res = "";
                const post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        res += chunk;
                    });

                    post_res.on('end', function () {
                        try {
                            let result = JSON.parse(res);
                            console.log(result);
                        } catch(e) {
                            console.log("Error parsing response:", e);
                        }
                        response.redirect(`http://localhost:3000/`);
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });
        } else {
            console.log("Checksum Mismatched");
            response.redirect(`http://localhost:3000/`);
        }
    });
}

export const initiateRazorpayOrder = async (request, response) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: request.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_" + Math.random().toString(36).substring(7),
        };

        const order = await instance.orders.create(options);

        if (!order) return response.status(500).send("Some error occured");

        response.json({
            ...order,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.log('Error in initiateRazorpayOrder', error);
        response.status(500).send(error);
    }
}

export const verifyRazorpayPayment = async (request, response) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = request.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return response.status(200).json({ message: "Payment verified successfully", status: "SUCCESS" });
        } else {
            return response.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.log('Error in verifyRazorpayPayment', error);
        response.status(500).send(error);
    }
}