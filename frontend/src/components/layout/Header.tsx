import { AppBar, Toolbar, Typography, Box, Stack, Button, Container, useTheme, useMediaQuery, IconButton } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
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

  // 'No-Answer Archive' Nav Items
  const navItems = [
    { label: '아카이브 소개', href: '/' },
    { label: '불명예 전당', href: '#gallery' },
    { label: '흑역사 제보', href: '#upload' },
    { label: '시스템 공지', href: '#notices' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid #222',
        color: 'primary.main',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: maxWidth, px: paddingX }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 80 }, justifyContent: 'space-between' }}>
          {/* Logo Section */}
          <Stack direction="row" alignItems="center" spacing={1.5} component="a" href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <TerminalIcon sx={{ color: 'primary.main', fontSize: { xs: 28, md: 32 } }} />
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  lineHeight: 1.2,
                  color: 'primary.main',
                  letterSpacing: '-0.02em',
                  fontFamily: 'monospace'
                }}
              >
                NO_ANSWER
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontSize: { xs: '0.6rem', md: '0.7rem' },
                  color: '#666',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                ARCHIVE.SYS
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
            <Stack direction="row" spacing={1}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: '#888',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 255, 65, 0.05)',
                      color: 'primary.main',
                    },
                  }}
                >
                  [{item.label}]
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box sx={{ py: 2, borderTop: '1px solid #222' }}>
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', color: '#ccc', fontWeight: 600, fontFamily: 'monospace' }}
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
