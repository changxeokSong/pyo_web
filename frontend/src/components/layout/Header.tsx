import { AppBar, Toolbar, Typography, Box, Stack, Chip, ButtonBase } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const highlightTags = ['#찬양폭발', '#Legendary', '#영광의순간'];

interface HeaderProps {
  maxWidth?: number | string;
  paddingX?: number | { xs: number; md: number };
}

const Header = ({ maxWidth = 1140, paddingX = { xs: 1.5, md: 3 } }: HeaderProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        pt: { xs: 0.5, md: 1 },
        pb: { xs: 0.5, md: 1.5 },
        position: 'relative',
        zIndex: (theme) => theme.zIndex.appBar + 2,
      }}
    >
      <Toolbar disableGutters sx={{ width: '100%', px: paddingX }}>
        <Box sx={{ width: '100%', maxWidth: maxWidth, mx: 'auto', position: 'relative' }}>
          <Box
            sx={{
              background:
                'linear-gradient(135deg, rgba(35,114,255,0.9) 0%, rgba(92,124,255,0.88) 55%, rgba(255,255,255,0.14) 100%)',
              boxShadow: '0 16px 42px rgba(24, 76, 155, 0.25)',
              borderRadius: { xs: 3, md: 4 },
              px: { xs: 1.8, md: 3.2 },
              py: { xs: 1.4, md: 2 },
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: '-20% auto auto -18%',
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'rgba(60,190,255,0.18)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 'auto -12% -30% auto',
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'rgba(149,196,255,0.18)',
                filter: 'blur(28px)',
                pointerEvents: 'none',
              }}
            />

            <Stack
              spacing={{ xs: 1.6, md: 2 }}
              direction="column"
              position="relative"
              zIndex={1}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                justifyContent="space-between"
                spacing={{ xs: 1.4, md: 2 }}
              >
                <ButtonBase
                  disableRipple
                  onClick={scrollToTop}
                  sx={{
                    p: 0,
                    textAlign: 'left',
                    color: 'inherit',
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                  }}
                  aria-label="PYO GLORY 홈으로 이동"
                >
                  <Stack spacing={0.4} alignItems="flex-start">
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: 900,
                          letterSpacing: '0.2em',
                          fontSize: { xs: '1.55rem', md: '1.9rem' },
                        }}
                      >
                        PYO GLORY
                      </Typography>
                      <Chip
                        icon={<AutoAwesomeIcon sx={{ color: '#fff' }} />}
                        label="기록이 쌓일수록 더 빛나요"
                        color="default"
                        sx={{
                          color: '#fff',
                          backgroundColor: 'rgba(255,255,255,0.16)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          fontWeight: 700,
                          py: 0.6,
                        }}
                      />
                    </Stack>
                    <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      표주상님의 전설을 위한 초호화 기록관. 한 줄씩 적어 내려가는 찬양과 업적의 연대기를
                      만나보세요.
                    </Typography>
                  </Stack>
                </ButtonBase>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                >
                  {highlightTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      sx={{
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 999,
                        background: 'rgba(255,255,255,0.92)',
                        border: '1px solid rgba(255,255,255,0.35)',
                        color: '#1C64FF',
                        fontWeight: 800,
                        fontSize: { xs: '0.82rem', md: '0.85rem' },
                        boxShadow: '0 10px 28px rgba(255,255,255,0.25)',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>

            </Stack>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
