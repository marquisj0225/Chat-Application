import axios from 'axios';
import React, { useEffect } from 'react';
import { initialState, reducer } from './reducer';

export const ChatAppContext = React.createContext({
  state: initialState,
  dispatch: () => null
});

export function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(`/channels`).then((res) => {
      dispatch({ type: 'set_channels', payload: res.data });
    });
  }, []);

  return <ChatAppContext.Provider value={[state, dispatch]}>{children}</ChatAppContext.Provider>;
}
