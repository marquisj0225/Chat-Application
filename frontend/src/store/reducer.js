import accounts from '../_mocks_/account';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'set_channels':
      return {
        ...state,
        channels: action.payload
      };

    case 'open_channels_browser':
      return {
        ...state,
        channelsBrowserOpen: action.payload
      };

    case 'channel_joinded':
      return {
        ...state,
        channels: [...state.channels, action.payload]
      };

    case 'set_user':
      window.user = action.payload;
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export const initialState = {
  channels: [],
  channelsBrowserOpen: false,
  user: accounts[0]
};
