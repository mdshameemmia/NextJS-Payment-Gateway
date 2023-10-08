import HouseRent from "@/models/HouseRent";
import Payment from "@/models/Payment";
import Role from "@/models/Role";
import User from "@/models/User";

const { default: db } = require("@/db/connect")

const BillGenAndSendMessage = async (req, res) => {
    await db.connect();
    try{
        const { user_id } = req.body;

        const user = await User.findById(user_id).populate({
            path: "role_id",
            ref: Role.modelName,
            required:true
          });
        
        if (user.role_id.role == "admin") {
        const users = await User.find({ admin_mail: user.email }).select('_id');
        const all_users = await User.find({admin_mail:user.email});
        let user_ids =  [];
        
        users.forEach(user => {
            user_ids.push(user._id);
        })
        
        const renters = await HouseRent.find({user_id : { $in : user_ids }}).select("amount user_id member_id flat_id floor_id building_id date -_id");
       
        await Payment.insertMany(renters);

        
        return res.status(200).json(all_users);
        
        }

        return res.status(200).json('Successfully send message');

    }catch(err){
        res.json(err)
    }
}



export default BillGenAndSendMessage;