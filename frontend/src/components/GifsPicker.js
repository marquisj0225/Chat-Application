import { Popover, InputBase, IconButton, Paper, Box, Grid } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

const GifContainer = styled(Box)({
  display: 'flex',
  minHeight: '200px',
  padding: '10px',
  marginTop: '5px'
});

function GifImage({ src, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      aria-hidden="true"
    >
      <img alt={src} src={src} />
    </div>
  );
}

export default function GifsPicker({ icon, onClick }) {
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const res = await giphy.animate(e.target.value, { limit: 20 });
    setResults(res.data);
  };

  return (
    <PopupState variant="popover" popupId="gif-popup-popover">
      {(popupState) => (
        <div>
          <IconButton sx={{ p: '10px' }} aria-label="message" {...bindTrigger(popupState)}>
            {icon}
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Paper component="div" sx={{ p: '5px 4px', width: '400px' }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type anything..."
                onChange={handleChange}
              />
              {results && (
                <GifContainer>
                  <Grid container spacing={2}>
                    {results.map((result, index) => (
                      <Grid key={index} item xs={4}>
                        <GifImage
                          src={result.url}
                          onClick={() => {
                            onClick(result);
                            setResults([]);
                            popupState.close();
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </GifContainer>
              )}
            </Paper>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
