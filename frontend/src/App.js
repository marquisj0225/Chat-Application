// components
import ScrollToTop from './components/ScrollToTop';
// routes
import Router from './routes';
import { StoreProvider } from './store/StoreProvider';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <StoreProvider>
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </StoreProvider>
    </ThemeConfig>
  );
}
