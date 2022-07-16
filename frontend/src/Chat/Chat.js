import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Button, TextField } from "@mui/material";

let index = 0;
const mg = [];
export default function Chat({ socket }) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  socket.on("chat", (data) => {
    console.log(data);
    setMessages([...messages, data]);
  });
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

  const handleSend = () => {
    setMessages([...messages, { sender: userId, message: values }]);
    socket.emit("chat", { sender: userId, message: values });
    setIsInputValid(false);
    setValues("");
  };

  const content =
    messages.length &&
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
            <PersonIcon /> {sender !== userId ? "You" : "Me"}
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

      <Box sx={{ display: "flex", gap: "0.5rem" }}>
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
    </Box>
  );
}
