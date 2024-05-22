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
    <WidgetWrapper customColor={"#8A1F5A"}>
      <Typography
        color="#FCE4C3"
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
          renderInput={(params) => <TextField {...params} label="User"

        

          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused': {
                borderColor: '#FCE4C3 ', 
      
              },
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FCE4C3 ',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FCE4C3 ',
            },

            '& .MuiInputLabel-shrink': {
              transform: 'translate(30px, -20px) scale(1)', 
            },

            
          }} 
          
          
          
          />}
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
            '& .MuiAutocomplete-inputRoot': {
              backgroundColor: "white",
              borderRadius: "2rem",
              padding: "1rem 2rem",
              height: "56px", 
            },
          }}
          ListboxProps={{
            style: {
              maxHeight: '200px', 
              overflow: 'auto',
            },
            sx: {
              '& .MuiAutocomplete-option': {
                '&:hover': {
                  backgroundColor: '#FCE4C3 ', 
                },
              },
            },
          }}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default SearchWidget;