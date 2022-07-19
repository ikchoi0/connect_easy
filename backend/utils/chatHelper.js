const Message = require("../models/message");
const Appointment = require("../models/appointment");
const User = require("../models/user");
const Types = require("mongoose").Types;

const addChatMessage = async (appointmentId, message) => {
  const newMessage = await Message.create(message);

  const appointment = await Appointment.findById(appointmentId);
  appointment.conversation.push(newMessage._id);
  await appointment.save();
};

const getChatMessages = async (appointmentId) => {
  const appointment = await Appointment.findById(appointmentId).populate(
    "conversation"
  );

  const messages = appointment.conversation.map((msgInfo) => {
    return { sender: msgInfo.sender, message: msgInfo.message };
  });

  return messages;
};

module.exports = { addChatMessage, getChatMessages };
