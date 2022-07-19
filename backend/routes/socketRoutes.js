const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

router.get("/messages/:meetingId", async (req, res) => {
  const { meetingId } = req.params;

  const appointment = await Appointment.findById(meetingId).populate(
    "conversation"
  );

  const messages = appointment.conversation.map((msgInfo) => {
    return { sender: msgInfo.sender, message: msgInfo.message };
  });

  return res.send(messages);
});

module.exports = router;
