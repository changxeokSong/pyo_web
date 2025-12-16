import { useState, useEffect } from 'react';
import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Stack,
} from '@mui/material';
import Header from './components/layout/Header';
import PostForm from './features/posts/PostForm';
import PostList from './features/posts/PostList';
import AnnouncementBox from './features/announcements/AnnouncementBox';
import type { Post } from './features/posts/types';
import type { Announcement } from './features/announcements/types';
import TerminalIcon from '@mui/icons-material/Terminal';

const CONTENT_MAX_WIDTH = 1200;
const HORIZONTAL_PADDING = { xs: 2, md: 4 } as const;

// Archive Theme: Dark, Neon Green/Pink, Monospace headers
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff41', // Matrix Green / Neon
      contrastText: '#000',
    },
    secondary: {
      main: '#ff0055', // Cyberpunk Pink
      contrastText: '#fff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#111111',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
    action: {
      hover: 'rgba(0, 255, 65, 0.08)',
    }
  },
  typography: {
    fontFamily:
      '"JetBrains Mono", "Fira Code", "Consolas", "Noto Sans KR", monospace',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    button: { fontWeight: 700, letterSpacing: '0.05em' },
    body1: {
      fontFamily: '"Pretendard", "Noto Sans KR", sans-serif', // Body text easier to read
      lineHeight: 1.7,
      fontSize: '1.05rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0, // Sharp edges for terminal look
          border: '1px solid',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 10px rgba(0, 255, 65, 0.4)',
          },
        },
        containedPrimary: {
          background: '#0a0a0a',
          color: '#00ff41',
          borderColor: '#00ff41',
          '&:hover': {
            background: '#00ff41',
            color: '#000',
          }
        },
        containedSecondary: {
          background: '#0a0a0a',
          color: '#ff0055',
          borderColor: '#ff0055',
          '&:hover': {
            background: '#ff0055',
            color: '#fff',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          borderBottom: '1px solid #333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #333',
          backgroundColor: '#111',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    }
  },
});

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchAnnouncements();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/posts/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("데이터 로드 실패: 시스템 접속 불가");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements/');
      if (response.ok) {
        const data: Announcement[] = await response.json();
        setAnnouncementList(data);
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  // Fun Stats
  const heroStats = [
    { label: '박제된 흑역사', value: posts.length > 0 ? posts.length : '000' },
    { label: '목격자 수', value: '9,999+' },
    { label: '정신적 피해액', value: '∞' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            minHeight: '100vh',
            backgroundColor: '#050505',
            // Subtle scanline effect
            '&::after': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
              backgroundSize: '100% 2px, 2px 100%',
              pointerEvents: 'none',
              zIndex: 9999,
            }
          },
          '::selection': {
            backgroundColor: '#00ff41',
            color: '#000',
          }
        }}
      />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header maxWidth={CONTENT_MAX_WIDTH} paddingX={HORIZONTAL_PADDING} />

        <Box sx={{ flex: 1 }}>

          {/* HERO SECTION */}
          <Box
            sx={{
              bgcolor: 'background.default',
              color: 'primary.main',
              pt: { xs: 8, md: 12 },
              pb: { xs: 8, md: 12 },
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid #222'
            }}
          >
            <Container maxWidth={false} sx={{ maxWidth: CONTENT_MAX_WIDTH, px: HORIZONTAL_PADDING, position: 'relative', zIndex: 1 }}>
              <Box sx={{ maxWidth: 800 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, color: 'secondary.main' }}>
                  <TerminalIcon fontSize="small" />
                  <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: '0.2em' }}>
                    SYSTEM_READY...
                  </Typography>
                </Stack>

                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    fontFamily: 'monospace',
                    textTransform: 'uppercase'
                  }}
                >
                  <Box component="span" sx={{ color: '#fff' }}>노답 아카이브</Box>
                  <br />
                  <Box component="span" sx={{ color: 'primary.main', textShadow: '0 0 10px rgba(0,255,65,0.5)' }}>NO-ANSWER ARCHIVE</Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    opacity: 0.8,
                    maxWidth: 600,
                    mb: 5,
                    color: '#ccc'
                  }}
                >
                  지우고 싶어도 지워지지 않는 그날의 기억, 여기에 영원히 박제하십시오.
                  <br />
                  <Box component="span" sx={{ fontSize: '0.8rem', color: '#666' }}>WARNING: Once uploaded, shame is eternal.</Box>
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    href="#upload"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                  >
                    [ 흑역사 박제하기 ]
                  </Button>
                  <Button
                    href="#gallery"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                  >
                    [ 불명예의 전당 ]
                  </Button>
                </Box>
              </Box>
            </Container>

            {/* Glitch/Grid Effect bg */}
            <Box
              sx={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: '50%',
                opacity: 0.03,
                backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                zIndex: 0
              }}
            />
          </Box>

          {/* STATS SECTION */}
          <Box sx={{ borderBottom: '1px solid #222', bgcolor: '#0f0f0f' }}>
            <Container maxWidth={false} sx={{ maxWidth: CONTENT_MAX_WIDTH, px: HORIZONTAL_PADDING }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                  py: 4,
                  divideX: { sm: '1px solid #333' },
                  gap: { xs: 3, sm: 0 }
                }}
              >
                {heroStats.map((stat) => (
                  <Box key={stat.label} sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="h3" sx={{ color: '#fff', mb: 1, fontFamily: 'monospace' }}>{stat.value}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.1em' }}>{stat.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>

          {/* MAIN CONTENT AREA */}
          <Container maxWidth={false} sx={{ maxWidth: CONTENT_MAX_WIDTH, px: HORIZONTAL_PADDING, py: 8 }}>

            {/* Notices Section */}
            <Box id="notices" sx={{ mb: 8 }}>
              <AnnouncementBox announcements={announcementList} />
            </Box>

            {/* Upload Section */}
            <Box id="upload" sx={{ mb: 12 }}>
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', display: 'flex', gap: 1 }}>
                {'>'} 흑역사 데이터 입력
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                시스템이 귀하의 부끄러운 과거를 안전하게 암호화하여(거짓말) 보관합니다.
              </Typography>
              <PostForm onPostCreated={handlePostCreated} setError={setError} />
            </Box>

            {/* Gallery Section */}
            <Box id="gallery" sx={{ mb: 8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ color: 'secondary.main', display: 'flex', gap: 1 }}>
                    {'>'} 불명예의 전당
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    타인의 고통은 나의 즐거움. 마음껏 비웃어주세요.
                  </Typography>
                </Box>
              </Box>
              {error && (
                <Alert severity="error" variant="outlined" sx={{ mb: 4, borderColor: 'error.main', color: 'error.main' }}>
                  {error}
                </Alert>
              )}
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                <PostList posts={posts} loading={loading} />
              )}
            </Box>

          </Container>
        </Box>

        {/* FOOTER */}
        <Box sx={{ bgcolor: '#000', borderTop: '1px solid #222', color: '#666', py: 6 }}>
          <Container maxWidth={false} sx={{ maxWidth: CONTENT_MAX_WIDTH, px: HORIZONTAL_PADDING }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4}>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontFamily: 'monospace' }}>NO-ANSWER ARCHIVE</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Established 2024.<br />
                  We do not take responsibility for mental damage.<br />
                  All rights reserved by Your Dark Past.
                </Typography>
              </Box>
              <Stack spacing={1}>
                <Typography variant="button" sx={{ color: '#888', cursor: 'pointer', '&:hover': { color: '#fff' } }}>[ 데이터 삭제 요청 (거절됨) ]</Typography>
                <Typography variant="button" sx={{ color: '#888', cursor: 'pointer', '&:hover': { color: '#fff' } }}>[ 이용약관 ]</Typography>
              </Stack>
            </Stack>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;
