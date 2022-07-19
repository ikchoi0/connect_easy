import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Button, TextField } from "@mui/material";

let index = 0;

export default function Chat({
  socket,
  meetingId,
  pastMessages,
  styles,
  isParentInvoice,
}) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const [values, setValues] = useState("");
  const scrollRef = useRef(null);

  const [isInputValid, setIsInputValid] = useState(false);
  const [messages, setMessages] = useState([]);

  socket.on("chat", (data) => {
    setMessages([...messages, data]);
  });

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (values !== "") setIsInputValid(true);
  }, [values]);

  useEffect(() => {
    setMessages(pastMessages);
  }, [pastMessages]);

  const handleSend = () => {
    setMessages([...messages, { sender: userId, message: values }]);
    socket.emit("chat", { sender: userId, message: values }, meetingId);
    setIsInputValid(false);
    setValues("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const content =
    messages &&
    messages.map(({ sender, message }) => {
      return (
        <Box
          key={index++}
          ref={scrollRef}
          sx={{
            textAlignLast: sender !== userId ? "left" : "right",
          }}
        >
          <Paper key={message} elevation={2} sx={{ paddingX: "10px" }}>
            <PersonIcon /> {sender !== userId ? "Them" : "Me"}
            <Typography sx={{ wordWrap: "break-word" }}>{message}</Typography>
          </Paper>
        </Box>
      );
    });

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "420px",
          bgcolor: "white",
          display: "flex",
          gap: 2,
          justifyContent: "start",
          flexDirection: "column",
          overflowY: "scroll",
          borderRadius: "10px",
          marginBottom: "10px",
          padding: "5px",
        }}
      >
        {content}
      </Box>

      {!isParentInvoice && (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <TextField
            id="standard-name"
            label="Enter your message"
            value={values}
            onKeyPress={onKeyPress}
            onChange={(event) => {
              setValues(event.target.value);
            }}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={handleSend}
            disabled={!isInputValid}
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
}
