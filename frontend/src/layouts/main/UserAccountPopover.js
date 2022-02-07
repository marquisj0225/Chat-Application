import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton, Avatar } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

import { ChatAppContext } from '../../store/StoreProvider';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserAccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useContext(ChatAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (account) => {
    dispatch({ type: 'set_user', payload: account });
    navigate(`/channels`);
    setOpen(false);
    axios.get(`/channels`).then((res) => {
      dispatch({ type: 'set_channels', payload: res.data });
    });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Avatar
          src={state.user.photoURL}
          alt={`${state.user.first_name} ${state.user.last_name}`}
        />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {users.map((user) => (
            <MenuItem
              key={user.id}
              selected={user.id === state.user.id}
              onClick={() => handleClick(user)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component={Avatar} alt={user.label} src={user.photoURL} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {`${user.first_name} ${user.last_name} `}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
