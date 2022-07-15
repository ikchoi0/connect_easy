import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Button, TextField } from "@mui/material";

let index = 0;
const mg = [
  { sender: { id: 1 }, message: "Hello" },
  { sender: { id: 2 }, message: "Hi" },
  { sender: { id: 1 }, message: "How are you?" },
  { sender: { id: 2 }, message: "I'm fine" },
  { sender: { id: 1 }, message: "How are you?" },
  { sender: { id: 2 }, message: "I'm fine" },
  { sender: { id: 2 }, message: "I'm fine" },
  { sender: { id: 2 }, message: "I'm fine" },
];
export default function Chat({ socket }) {
  const [values, setValues] = React.useState("");
  const scrollRef = useRef(null);
  // const [list, setList] = useState([]);
  const [isInputValid, setIsInputValid] = useState(false);
  const [messages, setMessages] = useState([...mg]);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (values !== "") setIsInputValid(true);
  }, [values]);
  useEffect(() => {
    {
      socket &&
        socket.on("message", (data) => {
          setMessages([...messages, data]);
        });
    }
  }, []);
  const handleSend = () => {
    setMessages([...messages, { sender: { id: 1 }, message: values }]);
    {
      socket && socket.emit("message", { sender: { id: 1 }, message: values });
    }
    setIsInputValid(false);
    setValues("");
  };
  const content = messages.map(({ sender, message }) => {
    return (
      <Box
        key={index++}
        sx={{
          textAlignLast: sender.id === 1 ? "right" : "left",
        }}
      >
        <Paper key={message} elevation={4} sx={{ paddingX: "10px" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            {sender.id === 1 ? "Me" : "You"}
          </Typography>
          <Typography sx={{ wordWrap: "break-word" }}>{message}</Typography>
        </Paper>
      </Box>
    );
  });

  return (
    <>
      <Box
        sx={{
          height: "100%",
          // bgcolor: "background.default",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {content}
        <div ref={scrollRef}></div>
      </Box>

      <Box
  
        sx={{ display: "flex", gap: "0.5rem", marginTop: "10px" }}
      >
        <TextField
          id="standard-name"
          label="Enter your message"
          value={values}
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
    </>
  );
}
