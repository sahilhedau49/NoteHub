const express = require("express");
const {
  createRoom,
  addNewMemberToRoom,
  addNewAdminToRoom,
  addDocumentInRoom,
  deleteDocumentById,
  removeMemberFromRoom,
} = require("../controllers/rooms");
const {
  getRoomDetails,
  getRoomsForMember,
  getDocumentsByRoomIdIfMember,
} = require("../controllers/data");
const router = express.Router();

router
  .route("/getDocuments/:room_id/:member_name")
  .get(getDocumentsByRoomIdIfMember); // pass username with body
router.route("/getRoomDetails/:room_id").get(getRoomDetails);
router.route("/getRoomsForMember/:member_name").get(getRoomsForMember);

router.route("/createRoom").post(createRoom);
router.route("/addNewAuthor").post(addNewAdminToRoom);
router.route("/addNewMemberInRoom").post(addNewMemberToRoom);
router.route("/addDocumentInRoom").post(addDocumentInRoom);

router.route("/deleteDocByID/:id").delete(deleteDocumentById);
router.route("/leaveRoom/:room_id/:member_name").delete(removeMemberFromRoom);

module.exports = router;
