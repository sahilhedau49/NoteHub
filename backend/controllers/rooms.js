const pool = require("../db");

const createRoom = async (req, res) => {
  const q = "INSERT INTO Rooms (`room_name`, `room_description`) VALUES (?, ?)";
  const values = [req.body.room_name, req.body.room_description];

  try {
    const [data] = await pool.execute(q, values);
    res.json({
      message: "Room created successfully",
      data: data,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { createRoom };
