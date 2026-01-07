import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
            Box,
            TextField,
            Button,
            Typography,
            Paper
} from "@mui/material";
import { fetchMessages, sendMessage } from "../api/message";


const Chat = ({ currentUser }) => {
            const { id: matchId } = useParams();
            const [text, setText] = useState("");

            const myId = currentUser?._id;


            const { data: messages = [], refetch } = useQuery({
                        queryKey: ["messages", matchId],
                        queryFn: () => fetchMessages(matchId),
            });

            const handleSend = async () => {
                        if (!text.trim()) return;

                        await sendMessage(matchId, text);
                        setText("");
                        refetch();
            };

            return (
                        <Box
                                    height="100vh"
                                    display="flex"
                                    flexDirection="column"
                        >
                                  
                                    <Box p={2} bgcolor="#f5f5f5">
                                                <Typography variant="h6">Chat</Typography>
                                    </Box>

                         
                                    <Box
                                                flex={1}
                                                p={2}
                                                bgcolor="#fafafa"
                                                overflow="auto"
                                    >
                                                {messages.map((msg) => {
                                                            const isMine = msg.senderId === myId;

                                                            return (
                                                                        <Box
                                                                                    key={msg._id}
                                                                                    display="flex"
                                                                                    justifyContent={isMine ? "flex-end" : "flex-start"}
                                                                                    mb={1}
                                                                        >
                                                                                    <Paper
                                                                                                sx={{
                                                                                                            p: 1,
                                                                                                            maxWidth: "60%",
                                                                                                            bgcolor: isMine ? "#ffebee" : "#ffffff"
                                                                                                }}
                                                                                    >
                                                                                                <Typography>{msg.text}</Typography>
                                                                                    </Paper>
                                                                        </Box>
                                                            );
                                                })}
                                    </Box>

                        
                                    <Box p={2} display="flex" gap={1}>
                                                <TextField
                                                            fullWidth
                                                            size="small"
                                                            placeholder="Type message..."
                                                            value={text}
                                                            onChange={(e) => setText(e.target.value)}
                                                />
                                                <Button
                                                            variant="contained"
                                                            onClick={handleSend}
                                                >
                                                            Send
                                                </Button>
                                    </Box>
                        </Box>
            );
};

export default Chat;
