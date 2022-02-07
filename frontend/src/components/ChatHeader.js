import { Stack, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const Header = styled(Box)({
  minHeight: '92px',
  padding: '0px'
});

export default function ChatHeader({ channel = {} }) {
  return (
    <Header>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding="15px">
        <Typography variant="h4" gutterBottom marginBottom="0">
          # {channel.name}
        </Typography>
      </Stack>
      <Divider orientation="horizontal" />
    </Header>
  );
}
