import db from "@/db/connect"
import User from "@/models/User"

module.exports = async (req, res) => {
  await db.connect();
  await within(getUsers, res, 10000)
}

async function within(fn, res, duration) {
  const id = setTimeout(() => res.json({
      message: "There was an error with the upstream service!"
  }), duration)
  
  try {
      let data = await fn()
      clearTimeout(id)
      res.json(data)
  } catch(e) {
    res.status(500).json({message: e.message})
  }
}

async function getUsers() {
  return 'success';
}