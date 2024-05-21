import React, { useState, useEffect } from 'react';
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper";
import { useNavigate } from 'react-router-dom';

const SearchWidget = () => {
  const [users, setAllUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setAllUsers(data);

      const newOptions = data.map((item) => {
        const { firstName, lastName, _id } = item;
        return { label: `${firstName} ${lastName}`, id: _id };
      });
      setOptions(newOptions);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color="#0BB2A2"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Search for a user
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="User" />}
          value={selectedUser}
          onChange={(event, newValue) => {
            setUserId(newValue ? newValue.id : "");
            setSelectedUser(newValue);
            if (newValue) {
              navigate(`/profile/${newValue.id}`);
            }
          }}
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default SearchWidget;
