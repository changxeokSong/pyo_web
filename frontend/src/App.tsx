import {
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Container,
  Typography,
  Stack,
  Link,
} from '@mui/material';
import Header from './components/layout/Header';
import HeroSection from './components/corporate/HeroSection';
import BusinessSection from './components/corporate/BusinessSection';

// Corporate Theme: Blue/White, Professional, Clean
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1', // Deep Blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976d2', // Lighter Blue
      contrastText: '#fff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#212121',
      secondary: '#5f6368',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#333',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box sx={{ flex: 1 }}>
          <Box id="about">
            <HeroSection />
          </Box>

          <Box id="solutions">
            <BusinessSection />
          </Box>

          {/* Contact / Info Section */}
          <Box id="contact" sx={{ py: 10, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>Contact Us</Typography>
                  <Typography variant="h3" sx={{ mb: 3, mt: 1, color: '#1a237e' }}>
                    Partner with YIM
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Ready to transform your business with our communication solutions?
                    Contact us today for a consultation.
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', textAlign: { xs: 'left', md: 'right' } }}>
                  <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2, display: 'inline-block', textAlign: 'left', minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>YIM Information Tech</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Seoul, Republic of Korea
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Tel: 02-1234-5678
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: contact@yim-it.com
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Box>

        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: '#1a237e', color: 'rgba(255,255,255,0.7)', py: 6 }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4}>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>YIM Information Technology</Typography>
                <Typography variant="body2">
                  © 2025 YIM Information Technology. All rights reserved.<br />
                  Pure IP Communication Solution Provider.
                </Typography>
              </Box>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover">Company Introduction</Link>
                <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
                <Link href="#" color="inherit" underline="hover">Terms of Service</Link>
              </Stack>
            </Stack>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;

