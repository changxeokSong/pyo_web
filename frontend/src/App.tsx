import { useState, useEffect, useMemo } from 'react';
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
  useMediaQuery,
} from '@mui/material';
import Header from './components/layout/Header';
import PostForm from './features/posts/PostForm';
import PostList from './features/posts/PostList';
import AnnouncementBox from './features/announcements/AnnouncementBox';
import PraiseSection from './features/praises/PraiseSection';
import type { Post } from './features/posts/types';
import type { Announcement } from './features/announcements/types';
import { getDisplayableImageUrl } from './features/posts/imageUtils';

const fallbackHeroSources = [
  { color: '#DFF1FF', text: '업적을 올려주세요!' },
  { color: '#E4FAFF', text: '포토 존! 표주상의 순간을 남겨보세요.' },
  { color: '#F1FBFF', text: '표주상님의 업적이 배경을 채우게 됩니다.' },
  { color: '#DFF4FF', text: '여기에 당신의 표주상 업적이 빛납니다!' },
  { color: '#E8F6FF', text: '표주상님의 위대한 순간을 기록해 주세요.' },
  { color: '#F4FAFF', text: '표주상님의 업적으로 찬란한 역사를 만드세요.' },
];

const CONTENT_MAX_WIDTH = 1120;
const HORIZONTAL_PADDING = { xs: 1.5, md: 3 } as const;
const sectionContainerSx = { maxWidth: CONTENT_MAX_WIDTH, mx: 'auto', width: '100%' } as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#35B5FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0E567C',
    },
    background: {
      default: '#E8F6FF',
      paper: '#F4FAFF',
    },
    text: {
      primary: '#0F1D2B',
      secondary: '#4B6271',
    },
  },
  typography: {
    fontFamily:
      '"Pretendard", "Spoqa Han Sans Neo", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          paddingInline: '1.8rem',
          paddingBlock: '0.85rem',
          backgroundImage: 'linear-gradient(135deg, #36C3FF, #5C7CFF)',
          boxShadow: '0 18px 36px rgba(69, 107, 255, 0.25)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          border: 'none',
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 25px 55px rgba(54, 126, 255, 0.15)',
        },
      },
    },
  },
});

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
  const isMobile = useMediaQuery('(max-width:768px)');

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
      setError("표주상님의 위대한 업적을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
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
      // Do not show error for announcement
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const latestAnnouncement = announcementList[0] ?? null;
  const koreaToday = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
  const latestAnnouncementDate = latestAnnouncement
    ? new Date(latestAnnouncement.created_at).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
    : null;
  const isAnnouncementToday = Boolean(latestAnnouncementDate && latestAnnouncementDate === koreaToday);

  const heroStats = [
    { label: '등록된 위업', value: posts.length },
    { label: '영감 받은 이들', value: '∞+' },
    { label: '오늘의 찬양', value: isAnnouncementToday ? '업데이트 완료' : '기다리는 중' },
  ];

  const heroImages = useMemo(() => {
    const sources = posts
      .map((post) => getDisplayableImageUrl(post.image))
      .filter((src): src is string => Boolean(src));
    return sources;
  }, [posts]);

  const collageFrames = useMemo(() => {
    const baseSources = heroImages.length ? heroImages : fallbackHeroSources;
    const desiredCount = heroImages.length
      ? Math.max(heroImages.length * 8, isMobile ? 150 : 200)
      : isMobile
        ? 110
        : 150;
    const widthStep = isMobile ? 14 : 22;
    const baseWidth = heroImages.length ? (isMobile ? 140 : 180) : isMobile ? 150 : 200;
    const verticalSpread = isMobile ? 190 : 150;

    return Array.from({ length: desiredCount }, (_, idx) => {
      const src = baseSources[idx % baseSources.length];
      const seedX = Math.sin(idx * 5.7 + idx * 0.23);
      const seedY = Math.cos(idx * 4.1 + idx * 0.19);
      const width = baseWidth + (idx % 6) * widthStep;
      const height = width * (heroImages.length ? 0.62 : 0.58);
      const posX = ((seedX + 1) / 2) * 110 - 5;
      const posY = ((seedY + 1) / 2) * verticalSpread - 10 + idx * 0.08;

      return {
        left: posX,
        top: posY,
        width,
        height,
        rotate: heroImages.length ? seedX * 6 : 0,
        src,
        isMessage: typeof src !== 'string',
        message: typeof src === 'string' ? undefined : src.text,
        background: typeof src === 'string' ? undefined : src.color,
        animationDuration: (isMobile ? 12 : 18) + (idx % 6),
      };
    });
  }, [heroImages, isMobile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            minHeight: '100vh',
            backgroundColor: '#E6F3FF',
            backgroundImage:
              'radial-gradient(circle at 8% 10%, rgba(103, 201, 255, 0.35), transparent 45%), radial-gradient(circle at 85% 5%, rgba(133, 163, 255, 0.4), transparent 40%), linear-gradient(135deg, #F4FBFF 0%, #E4EFFD 50%, #F5F9FF 100%)',
            overflowX: 'hidden',
          },
          '*, *::before, *::after': {
            caretColor: 'transparent',
          },
          'input, textarea, select': {
            caretColor: 'auto',
          },
          '@keyframes floatCard': {
            '0%': {
              transform: 'translate3d(0, 0, 0) rotate(-4deg) scale(0.95)',
            },
            '30%': {
              transform: 'translate3d(18px, -35px, 0) rotate(1deg) scale(1.04)',
            },
            '60%': {
              transform: 'translate3d(-25px, -15px, 0) rotate(-6deg) scale(1.06)',
            },
            '100%': {
              transform: 'translate3d(0, 0, 0) rotate(4deg) scale(0.97)',
            },
          },
          '.static-text, .static-text *': {
            userSelect: 'none',
            caretColor: 'transparent',
            cursor: 'default',
          },
        }}
      />
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'visible' }}>
        <Header maxWidth={CONTENT_MAX_WIDTH} paddingX={HORIZONTAL_PADDING} />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-8%', md: '-22%' },
            left: '50%',
            width: { xs: '200vw', md: '170vw' },
            height: { xs: '320vh', md: '220vh' },
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 8% 12%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 92% 18%, rgba(255,255,255,0.25), transparent 40%)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at top, rgba(255,255,255,0.25), transparent 70%)',
              zIndex: 0,
            }}
          />
          {collageFrames.map(({ src, isMessage, message, background, left, top, width, height, rotate, animationDuration }, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'absolute',
                width,
                height,
                borderRadius: 28,
                overflow: 'hidden',
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                animation: `floatCard ${animationDuration}s ease-in-out infinite`,
                animationDelay: `${idx * 0.35}s`,
                border: '1px solid rgba(255,255,255,0.5)',
                background: isMessage ? background : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 45px 90px rgba(5, 15, 30, 0.25)',
                opacity: isMobile ? 0.92 : 0.82,
              }}
            >
              {isMessage ? (
                <Typography
                  sx={{
                    color: '#0F3655',
                    fontWeight: 800,
                    textAlign: 'center',
                    px: 2,
                    letterSpacing: '0.05em',
                  }}
                >
                  {message}
                </Typography>
              ) : (
                <Box
                  className="static-text"
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'saturate(1.05) brightness(0.95)',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            position: 'relative',
            zIndex: 1,
            pt: { xs: 5, md: 10 },
            pb: { xs: 6, md: 8 },
            color: 'text.primary',
            px: HORIZONTAL_PADDING,
          }}
        >
          <Box
            component="section"
            sx={{
              ...sectionContainerSx,
              textAlign: 'center',
              mb: 6,
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(84, 148, 255, 0.2)',
              boxShadow: '0 30px 60px rgba(65, 119, 255, 0.2)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: { xs: '-15% auto auto -25%', md: '-20% -20% auto auto' },
                borderRadius: '50%',
                width: 300,
                height: 300,
                background: 'rgba(54,195,255,0.12)',
                filter: 'blur(12px)',
                zIndex: -1,
              }}
            />
            <Typography variant="overline" className="static-text" sx={{ color: 'primary.main', letterSpacing: '0.4em' }}>
              PYO SUPREMACY
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              className="static-text"
              sx={{
                mt: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 900 }}>
                표주상
              </Box>
              님의 위업을 영원히 빛나게 하는 아카이브
            </Typography>
            <Typography variant="body1" className="static-text" sx={{ mt: 2, color: 'text.secondary' }}>
              보는 순간 모두가 감탄하고,{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                표주상
              </Box>
              님을 더욱 사랑하게 되는 공간.
              <br />
              지금, 표주상님의 업적으로 이 찬란한 기록을 완성하세요.
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(160px, 1fr))', md: 'repeat(3, 1fr)' },
                justifyItems: 'center',
                gap: { xs: 2.5, md: 3 },
                mt: 5,
              }}
            >
              {heroStats.map((stat) => (
                <Box
                  key={stat.label}
                  className="static-text"
                  sx={{
                    minWidth: 180,
                    px: 3,
                    py: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 18px 40px rgba(90, 155, 255, 0.3)',
                  }}
                >
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', letterSpacing: '0.2em' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: 'primary.main' }}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>
              <Button
                href="#post-form"
                variant="contained"
                size="large"
                sx={{
                  mt: 5,
                  width: { xs: '100%', sm: 'auto' },
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
              >
                표주상님의 업적을 세상에 공개하기
              </Button>
          </Box>

          <Box sx={{ ...sectionContainerSx }}>
            <AnnouncementBox announcements={announcementList} />
          </Box>

          <Box id="post-form" sx={{ ...sectionContainerSx }}>
            <PostForm onPostCreated={handlePostCreated} setError={setError} />
          </Box>

          <Box sx={{ ...sectionContainerSx, mt: 4 }}>
            <PraiseSection />
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ ...sectionContainerSx }}>
            <PostList posts={posts} loading={loading} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
