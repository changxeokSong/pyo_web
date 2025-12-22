import { Box, Container, Typography, Button, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HeroSectionProps {
    onInquiryClick?: () => void;
}

const HeroSection = ({ onInquiryClick }: HeroSectionProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative Background Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 25%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 25%)',
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="lg">
                <Stack spacing={4} sx={{ maxWidth: '800px' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: { xs: '0.9rem', md: '1.25rem' },
                        }}
                    >
                        Pure IP Communication Solution
                    </Typography>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        YM Information Technology
                        <br />
                        <Box component="span" sx={{ fontSize: '0.5em', fontWeight: 500, display: 'block', mt: 2 }}>
                            IP · 네트워크 · 매장 솔루션 토탈 구축 / 유지보수
                        </Box>
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 400,
                            opacity: 0.9,
                            maxWidth: '700px',
                            fontFamily: '"Noto Sans KR", sans-serif',
                            fontSize: { xs: '1rem', md: '1.5rem' },
                        }}
                    >
                        고객의 비즈니스 환경에 최적화된 통신 솔루션과<br />
                        안정적인 네트워크 인프라를 제공합니다.
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            onClick={onInquiryClick}
                            sx={{
                                bgcolor: 'white',
                                color: '#0d47a1',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    bgcolor: '#e3f2fd',
                                },
                            }}
                        >
                            솔루션 문의하기
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;
