import db from "@/db/connect";
import Payment from "@/models/Payment";
import User from "@/models/User";

const GetPayment = async (req, res) => {
    await db.connect();
    try{

        const user = await Payment.findOne({_id:req.body.id})
            .populate({path:"user_id",model:"User"})
            .populate({path:"member_id",model:"Member"});

        const admin = await User.findOne({email:user.user_id.admin_mail});


        return res.status(200).json({"admin":admin,"user":user});

    }catch(err){
        res.json(err);
    }
}

export default GetPayment;