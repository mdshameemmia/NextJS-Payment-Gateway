import db from "@/db/connect";
import Payment from "@/models/Payment";

const Info = async (req, res) => {
    await db.connect();
    try{

        const payment = await Payment.findById(req.body.user_id);
        return res.status(200).json(payment);

    }catch(err){
        res.json(err);
    }
}

export default Info;