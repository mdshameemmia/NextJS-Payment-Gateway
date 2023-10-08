import db from "@/db/connect";
import Role from "@/models/Role";
import data from "@/utils/data";

const handler = async (req, res) => {
  try {
    await db.connect();
    await Role.deleteMany();
    await Role.insertMany(data.roles);
    await db.disconnect();
    res.json({ message: "Role Seeded successfully" });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
export default handler;
