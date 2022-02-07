import { Card } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import socketIOClient from 'socket.io-client';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import Page from '../components/Page';

export default function ChannelView() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState();

  const refreshMessages = () => {
    axios.get(`/channels/${id}/messages`).then((response) => {
      setMessages(response.data);
    });
  };

  useEffect(() => {
    refreshMessages();

    axios.get(`/channels/${id}`).then((response) => {
      setChannel(response.data);
    });
  }, [id]);

  const onSend = (message) => {
    axios
      .post(`/channels/${id}/messages`, {
        ...message
      })
      .then((response) => {
        const newMessages = [...messages, response.data];
        setMessages(newMessages);
      });
  };

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
    socket.on(`channel-message-${id}`, (message) => {
      refreshMessages();
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, [id]);

  return (
    <Page title="Channel">
      <Card>
        <ChatHeader channel={channel} />
        <ChatMessages messages={messages} />
        <ChatInput onSend={onSend} />
      </Card>
    </Page>
  );
}
