import { Avatar, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { fToNow } from '../utils/formatTime';
import accounts from '../_mocks_/account';
import { ChatAppContext } from '../store/StoreProvider';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  display: 'flex',
  marginBottom: '24px'
});

const MessageBox = styled(Box)({
  display: 'flex'
});

const Time = styled(Typography)({
  display: 'flex',
  fontSize: '0.75rem',
  justifyContent: 'flex-end',
  lineHeight: 1.5,
  overflow: 'hidden'
});

const MessageContent = styled(Typography)({
  display: 'block',
  maxWidth: '320px',
  padding: '12px',
  marginTop: '4px',
  borderRadius: '8px',
  color: 'rgb(33, 43, 54)'
});

// ----------------------------------------------------------------------

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default function ChatMessage({ message }) {
  const isClient = (message) => message.sender_user_id === account.id;
  const [state] = useContext(ChatAppContext);
  const account = state.user;

  return (
    <RootStyle component="div" className="nrc-message-item">
      <MessageBox marginLeft={isClient(message) ? 'auto' : 'unset'}>
        <div style={{ display: 'flex' }}>
          {!isClient(message) && (
            <Avatar src={message.sender.photoURL} sx={{ marginRight: '10px' }} alt="photoURL" />
          )}
          <div>
            <Time component="span">{fToNow(message.created_at)} </Time>
            <MessageContent
              component="div"
              backgroundColor={isClient(message) ? 'rgb(200, 250, 205)' : 'rgb(244, 246, 248)'}
            >
              {message.content_type === 1 ? (
                message.content
              ) : (
                <img alt="gif" src={message.content} />
              )}
            </MessageContent>
          </div>
        </div>
      </MessageBox>
    </RootStyle>
  );
}
