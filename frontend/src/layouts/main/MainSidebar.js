import { Icon } from '@iconify/react';
import sharp from '@iconify/icons-ic/round-circle';
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { ChatAppContext } from '../../store/StoreProvider';

//

const getIcon = (name) => <Icon icon={name} width={8} height={8} />;

function buildChannelItems(channels) {
  return [
    ...channels.map((channel) => {
      return { title: channel.name, path: `/channels/view/${channel.id}`, icon: getIcon(sharp) };
    })
  ];
}

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

MainSideBar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function MainSideBar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [state] = useContext(ChatAppContext);

  const account = state.user;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {`${account.first_name}  ${account.last_name}`}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection channels={buildChannelItems(state.channels)} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
