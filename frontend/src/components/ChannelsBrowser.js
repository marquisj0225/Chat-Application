import searchIcon from '@iconify/icons-ic/search';
import { Icon } from '@iconify/react';
import debounce from 'lodash/debounce';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { ChatAppContext } from '../store/StoreProvider';
import Scrollbar from './Scrollbar';

function SearchInput({ ...props }) {
  return (
    <Paper
      component="div"
      sx={{ p: '5px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <Icon icon={searchIcon} width={22} height={22} />
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search in channels" {...props} />
    </Paper>
  );
}

export default function ChannelsBrowser({ open }) {
  const [state, dispatch] = React.useContext(ChatAppContext);
  const [results, setResults] = React.useState([]);

  const handleOnClose = () => {
    dispatch({ type: 'open_channels_browser', payload: false });
  };

  const debouncedSearchAPI = debounce(
    async (query) => {
      const { data } = await axios.get(`/channels/search`, { params: { q: query } });
      setResults(data);
    },
    800,
    { leading: true }
  );

  const handleOnSearch = async (e) => {
    const query = e.target.value;

    if (!query || /^\s*$/.test(query)) {
      setResults([]);
    } else {
      await debouncedSearchAPI(query);
    }
  };

  const handleJoinChannel = async (chhanelId) => {
    const { data } = await axios.post(`/channels/${chhanelId}/join`);
    dispatch({ type: 'channel_joinded', payload: data });
    dispatch({ type: 'open_channels_browser', payload: false });
    setResults([]);
  };

  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>
          Join a channel
          <IconButton
            aria-label="close"
            onClick={handleOnClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ minHeight: '300px' }}>
          <SearchInput onChange={handleOnSearch} />
          <Scrollbar>
            <List>
              {results &&
                results.map((result, index) => {
                  return (
                    <div key={index}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="join"
                            title="Join this channel"
                            onClick={() => handleJoinChannel(result.id)}
                          >
                            <CommentIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={result.name} secondary={result.description} />
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </div>
                  );
                })}
            </List>
          </Scrollbar>
        </DialogContent>
      </Dialog>
    </div>
  );
}
