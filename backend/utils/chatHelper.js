const Message = require("../models/message");
const Appointment = require("../models/appointment");
const User = require("../models/user");
const Types = require("mongoose").Types;

const addChatMessage = async (meetingId, message) => {
  const newMessage = await Message.create(message);
  //
  const conv = await Appointment.findById(meetingId);
  conv.conversation.push(newMessage._id);
  await conv.save();
  // console.log(conv);
};

module.exports = addChatMessage;
