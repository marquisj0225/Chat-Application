import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { Icon } from '@iconify/react';
import sendIcon from '@iconify/icons-ic/send';
import gifIcon from '@iconify/icons-ic/round-gif';
import emojiIcon from '@iconify/icons-ic/round-emoji-emotions';
import { styled } from '@mui/material/styles';
import { GiphyFetch } from '@giphy/js-fetch-api';
import PropTypes from 'prop-types';
import { useState } from 'react';
import GifsPicker from './GifsPicker';

// ----------------------------------------------------------------------

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const RootStyle = styled(Box)({
  display: 'flex'
});

// ----------------------------------------------------------------------

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired
};

export default function ChatInput({ onSend }) {
  const [msg, setMessage] = useState('');

  const onSubmit = () => {
    if (msg) {
      onSend({ content: msg, content_type: 1 });
      setMessage('');
    }
  };

  const handleGifClick = (gif) => {
    if (gif) {
      onSend({ content: gif.url, content_type: 2 });
    }
  };

  return (
    <RootStyle component="div">
      <Paper
        component="div"
        sx={{ p: '5px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          {getIcon(emojiIcon)}
        </IconButton>
        <InputBase
          value={msg}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Send a message to #general"
          inputProps={{ 'aria-label': 'Send a message to #general' }}
        />
        <GifsPicker icon={getIcon(gifIcon)} onClick={handleGifClick} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} aria-label="message" onClick={onSubmit}>
          {getIcon(sendIcon)}
        </IconButton>
      </Paper>
    </RootStyle>
  );
}
