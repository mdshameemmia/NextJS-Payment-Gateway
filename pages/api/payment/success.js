import db from "@/db/connect";
import Payment from "@/models/Payment";
import User from "@/models/User";

const Success = async (req, res) => {
  await db.connect();

  try {
    const id = req.body.tran_id;
    const url = process.env.APP_URL;

    const payment = await Payment.findById(id);
    payment.status = "Paid";
    await payment.save();
    
    const user = await User.findById(payment.user_id);
    const admin = await User.findOne({admin_mail:user.admin_mail});

    SendMessage(admin.mobile,`This ${user.email} has been paid house rent`);
    SendMessage(user.mobile,`Thanks. Successfully house rent has been paid to ${admin.email}`);

    return res.status(200).redirect(`${url}/payment`);
  } catch (err) {
    res.json(err);
  }
};

export default Success;
