import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchMatchUser } from "@/api/match";

import {
            Box,
            List,
            ListItem,
            ListItemText,
            CircularProgress,
            Typography,
            Paper
} from "@mui/material";

const getOtherUser = (users, myId) => {
            return users.find(user => user._id !== myId);
};


const Matches = ({ currentUser }) => {
            const navigate = useNavigate();
            const myId = currentUser?._id;

            const { data, isLoading } = useQuery({
                        queryKey: ["matches"],
                        queryFn: fetchMatchUser,
            });

            if (isLoading) {
                        return (
                                    <Box display="flex" justifyContent="center" mt={10}>
                                                <CircularProgress />
                                    </Box>
                        );
            }

            return (
                        <Box p={3}>
                                    <Typography variant="h5" mb={2}>
                                                Your Matches
                                    </Typography>

                                    <List>
                                                {data.matches.map((match) => {
                                                            const otherUser = getOtherUser(match.users, myId);

                                                            return (
                                                                        <Paper key={match._id} sx={{ mb: 2 }}>
                                                                                    <ListItem
                                                                                                button
                                                                                                onClick={() => navigate(`/chat/${match._id}`)}
                                                                                    >
                                                                                                <ListItemText
                                                                                                            primary={otherUser.name}
                                                                                                            secondary="Tap to start chatting"
                                                                                                />
                                                                                    </ListItem>
                                                                        </Paper>
                                                            );
                                                })}
                                    </List>
                        </Box>
            );
};

export default Matches;
