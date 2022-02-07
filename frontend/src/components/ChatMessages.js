import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { createRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import Scrollbar from './Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  display: 'flex'
});

const MessagesContainer = styled(Scrollbar)({
  padding: '24px',
  height: 'calc(100vh - 230px)'
});

// ----------------------------------------------------------------------

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default function ChatMessages({ messages }) {
  const messageRef = createRef();

  useEffect(() => {}, []);

  return (
    <RootStyle component="div">
      <MessagesContainer>
        <div className="nrc-message-list" ref={messageRef}>
          {messages?.map((message, index) => (
            <ChatMessage message={message} key={index} />
          ))}
        </div>
      </MessagesContainer>
    </RootStyle>
  );
}
