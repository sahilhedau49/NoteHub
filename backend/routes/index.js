const express = require("express");
const {
  createRoom,
  addNewMemberToRoom,
  addNewAdminToRoom,
  addDocumentInRoom,
  deleteDocumentById,
} = require("../controllers/rooms");
const {
  getAllRooms,
  getRoomsForMember,
  getDocumentsByRoomIdIfMember,
} = require("../controllers/data");
const router = express.Router();

router.route("/getDocuments/:room_id").get(getDocumentsByRoomIdIfMember); // pass username with body
router.route("/getAllRooms").get(getAllRooms);
router.route("/getRoomsForMember/:member_name").get(getRoomsForMember);

router.route("/createRoom").post(createRoom);
router.route("/addNewAuthor").post(addNewAdminToRoom);
router.route("/addNewMemberInRoom").post(addNewMemberToRoom);
router.route("/addDocumentInRoom").post(addDocumentInRoom);

router.route("/deleteDocByID/:id").delete(deleteDocumentById);

module.exports = router;
