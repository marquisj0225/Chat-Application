// material
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChannelsBrowser from '../../components/ChannelsBrowser';
import { ChatAppContext } from '../../store/StoreProvider';
//
import MainNavbar from './MainNavbar';
import MainSideBar from './MainSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 56;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(ChatAppContext);

  return (
    <RootStyle>
      <MainNavbar onOpenSidebar={() => setOpen(true)} />
      <MainSideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <ChannelsBrowser open={state.channelsBrowserOpen} />
    </RootStyle>
  );
}
