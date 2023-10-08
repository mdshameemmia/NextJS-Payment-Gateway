import User from "@/models/User";
import db from "@/db/connect";
import data from "@/utils/data";
const handler = async (req,res)=>{
    try{
        await db.connect();
        await User.deleteMany();
        await User.insertMany(data.users)
        await db.disconnect();
        res.json({message:'Seeded successfully'})
} catch(e) {
    res.status(500).json("Something went wrong");
  }

}

export default handler;