import db from "@/db/connect";
import SSLCommerzPayment from 'sslcommerz-lts';


const approveHandler = async (req, res) => {
    await db.connect();
    try {

        const store_id = process.env.SSLCZ_STORE_ID;
        const store_passwd = process.env.SSLCZ_STORE_PASSWD;
        const is_live = true //true for live, false for sandbox

        const data = {
            total_amount: req.body.amount,
            currency: 'BDT',
            tran_id: req.body.payment_id, // use unique tran_id for each api call
            success_url: 'http://localhost:3000/api/payment/success',
            fail_url: 'http://localhost:3000/api/payment/fail',
            cancel_url: 'http://localhost:3000/api/payment/cancel',
            ipn_url: 'http://localhost:3000/api/payment/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
       
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({url:GatewayPageURL});
            
        });

    
    } catch (err) {
      return res.json(err);
    }
  };
  
  export default approveHandler;
