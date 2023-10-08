import db from "@/db/connect";
import SendMessage from "@/helpers/SendMessage";
import Payment from "@/models/Payment";
import User from "@/models/User";

const Cancel = async (req, res) => {
  await db.connect();

  try {
    const id = req.body.tran_id;
    const url = process.env.APP_URL;

    const payment = await Payment.findById(id);
    payment.status = "Canceled";
    await payment.save();

    const user = await User.findById(payment.user_id);

    SendMessage(user.mobile,`You have canceled payment`);
    
    res.redirect(`${url}/payment`);

  } catch (err) {
    res.json(err);
  }
};

export default Cancel;
