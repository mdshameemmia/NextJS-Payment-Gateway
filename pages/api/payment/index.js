import db from "@/db/connect";
import HouseRent from "@/models/HouseRent";
import Payment from "@/models/Payment";
import Role from "@/models/Role";
import User from "@/models/User";

const Index = async (req, res) => {
  await db.connect();

  try {
    const { user_id } = req.body;

    const user = await User.findById(user_id).populate({
      path: "role_id",
      ref: Role.modelName,
      required: true,
    });

    if (user.role_id.role == "admin") {
      const renters = await User.find({ admin_mail: user.email }).select("_id");

      let user_ids = [];

      renters.forEach((user) => {
        user_ids.push(user._id);
      });

      let users = await Payment.find({ user_id: { $in: user_ids } })
        .populate({ path: "user_id", model: "User" })
        .populate({ path: "member_id", model: "Member" });

      return res.status(200).json(users);
    } else if (user.role_id.role == "user") {
      let users = await Payment.find({ user_id: user_id })
        .populate({ path: "user_id", model: "User" })
        .populate({ path: "member_id", model: "Member" });

      return res.status(200).json(users);
    } else {
      let users = await Payment.find({})
        .populate({ path: "user_id", model: "User" })
        .populate({ path: "member_id", model: "Member" });

      return res.status(200).json(users);
    }
  } catch (err) {
    res.json(err);
  }
};

export default Index;
