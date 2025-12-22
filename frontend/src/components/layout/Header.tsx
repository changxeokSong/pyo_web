import { AppBar, Toolbar, Typography, Box, Stack, Button, Container, useTheme, useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

interface HeaderProps {
  maxWidth?: number | string;
  paddingX?: number | { xs: number; md: number };
}

const Header = ({ maxWidth = 1200, paddingX = { xs: 2, md: 4 } }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Company', href: '#company' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        color: '#333',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: maxWidth, px: paddingX }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 80 }, justifyContent: 'space-between' }}>
          {/* Logo Section */}
          <Stack direction="row" alignItems="center" spacing={1.5} component="a" href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            {/* <BusinessIcon sx={{ color: '#0d47a1', fontSize: { xs: 28, md: 32 } }} /> */}
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  lineHeight: 1,
                  color: '#333',
                  letterSpacing: '-0.02em',
                  fontFamily: '"Noto Sans KR", sans-serif',
                }}
              >
                <Box component="span" sx={{ color: '#0d47a1' }}>Y</Box>IM<Box component="span" sx={{ fontSize: '0.6em', ml: 1, fontWeight: 500, color: '#666' }}>와이엠 정보통신</Box>
              </Typography>
            </Box>
          </Stack>

          {/* Navigation Section */}
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={3}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: '#333',
                    fontWeight: 600,
                    fontSize: '1rem',
                    fontFamily: '"Noto Sans KR", sans-serif',
                    '&:hover': {
                      color: '#0d47a1',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box sx={{ py: 2, borderTop: '1px solid #e0e0e0' }}>
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', color: '#333', fontWeight: 600 }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
