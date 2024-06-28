const db = require("../db");

const getDocumentsByRoomIdIfMember = (req, res) => {
  const { room_id, member_name } = req.params;

  const q = `
      SELECT documents.* 
      FROM documents
      JOIN roommembers ON documents.room_id = roommembers.room_id
      WHERE documents.room_id = ? AND roommembers.member_name = ?`;

  db.query(q, [room_id, member_name], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length === 0) {
      res.json({ message: "No documents found or member is not in the room" });
      return;
    }

    console.log("Documents retrieved successfully");
    res.json({
      message: "Documents retrieved successfully",
      documents: results,
    });
  });
};

const getRoomDetails = (req, res) => {
  const { room_id } = req.params;
  const q = "SELECT * FROM rooms WHERE room_id = ?";

  db.query(q, [room_id], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length === 0) {
      res.json({ message: "Room not found" });
      return;
    }

    console.log("Room's data retrieved successfully");
    res.json({ message: "Room's data retrieved successfully", data: results });
  });
};

const getRoomsForMember = (req, res) => {
  const { member_name } = req.params;

  const query = `
      SELECT rooms.*
      FROM rooms
      JOIN roommembers ON rooms.room_id = roommembers.room_id
      WHERE roommembers.member_name = ?`;

  db.query(query, [member_name], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length === 0) {
      res.json({ message: "No rooms found for this member" });
      return;
    }

    console.log("Rooms retrieved successfully");
    res.json({
      message: "Rooms retrieved successfully",
      rooms: results,
    });
  });
};

module.exports = {
  getDocumentsByRoomIdIfMember,
  getRoomDetails,
  getRoomsForMember,
};
