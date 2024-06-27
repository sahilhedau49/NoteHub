const db = require("../db");

const createRoom = async (req, res) => {
  const { room_name, room_description, room_id, admin_email } = req.body;

  const roomQuery =
    "INSERT INTO rooms (`room_id`, `room_name`, `room_description`) VALUES (?, ?, ?)";
  const roomValues = [room_id, room_name, room_description];

  db.query(roomQuery, roomValues, (err, roomResult) => {
    if (err) {
      console.error("Error creating room:", err);
      res.json(err);
      return;
    }

    const adminQuery =
      "INSERT INTO admins (`admin_email`, `room_id`) VALUES (?, ?)";
    const adminValues = [admin_email, room_id];

    db.query(adminQuery, adminValues, (err, adminResult) => {
      if (err) {
        res.json(err);
        return;
      }

      const memberQuery =
        "INSERT INTO roommembers (`member_name`, `room_id`) VALUES (?, ?)";
      const memberValues = [admin_email.split("@")[0], room_id];

      db.query(memberQuery, memberValues, (err, memberResult) => {
        if (err) {
          res.json(err);
          return;
        }

        console.log("Room and admin added successfully");
        res.json({
          message: "Room and admin added successfully",
          room: {
            id: room_id,
            name: room_name,
            description: room_description,
          },
          admin: {
            id: adminResult.insertId,
            name: admin_email,
            room_id: room_id,
          },
        });
      });
    });
  });
};

const addNewAdminToRoom = (req, res) => {
  const { admin_email, room_id } = req.body;

  const q = "INSERT INTO admins (`admin_email`, `room_id`) VALUES (?, ?)";
  const values = [admin_email, room_id];

  db.query(q, values, (err, result) => {
    if (err) {
      return res.json(err);
    }

    console.log("Admin added to room successfully");
    res.json({
      message: "Admin added to room successfully",
      result: result,
    });
  });
};

const addNewMemberToRoom = (req, res) => {
  const { member_name, room_id } = req.body;

  const q = "INSERT INTO roommembers (`member_name`, `room_id`) VALUES (?, ?)";
  const values = [member_name, room_id];

  db.query(q, values, (err, result) => {
    if (err) {
      return res.json(err);
    }

    console.log("New member added to room successfully");
    res.json({
      message: "New member added to room successfully",
      result: result,
    });
  });
};

const addDocumentInRoom = (req, res) => {
  const { room_id, doc_name, description, uploaded_by, url } = req.body;

  const q =
    "INSERT INTO documents (`room_id`, `doc_name`, `description`, `uploaded_by`, `url`) VALUES (?, ?, ?, ?, ?)";
  const values = [room_id, doc_name, description, uploaded_by, url];

  db.query(q, values, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }

    console.log("Document added to room successfully");
    res.json({
      message: "Document added to room successfully",
      document: result,
    });
  });
};

const deleteDocumentById = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM documents WHERE doc_id = ?";
  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("Error deleting document:", err);
      res.json(err);
      return;
    }

    console.log("Document deleted successfully");
    res.json({ message: "Document deleted successfully", result: result });
  });
};

module.exports = {
  createRoom,
  addNewAdminToRoom,
  addNewMemberToRoom,
  addDocumentInRoom,
  deleteDocumentById,
};
