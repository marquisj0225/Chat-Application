import plusIcon from '@iconify/icons-ic/add-circle-outline';
import { Icon } from '@iconify/react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { ChatAppContext } from '../store/StoreProvider';

// ----------------------------------------------------------------------

const ListItemButtonStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  })
);

const ListItemStyle = styled((props) => <ListItem disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info } = item;

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  return (
    <ListItemButtonStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemButtonStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array
};

export default function NavSection({ channels, ...other }) {
  const { pathname } = useLocation();
  const [state, dispatch] = useContext(ChatAppContext);
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  const handleAddChannel = () => {
    dispatch({ type: 'open_channels_browser', payload: true });
  };

  return (
    <Box {...other}>
      <List disablePadding>
        <ListItemStyle
          secondaryAction={
            <IconButton aria-label="add" onClick={handleAddChannel}>
              <Icon icon={plusIcon} width={24} height={24} />
            </IconButton>
          }
        >
          <ListItemText primary="CHANNELS" />
        </ListItemStyle>

        {channels.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
