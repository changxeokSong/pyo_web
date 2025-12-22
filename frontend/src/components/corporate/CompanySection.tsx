import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';

const CompanySection = () => {
    return (
        <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    {/* Left Side: Image / Visual */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 500,
                                bgcolor: '#f0f4f8',
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                            }}
                        >
                            {/* Decorative Background Elements */}
                            <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(25, 118, 210, 0.05)' }} />
                            <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(25, 118, 210, 0.05)' }} />

                            <Stack spacing={2} alignItems="center" sx={{ zIndex: 1, color: '#1565c0' }}>
                                <BusinessIcon sx={{ fontSize: 100, opacity: 0.8 }} />
                                <Typography variant="h5" fontWeight={700} sx={{ opacity: 0.8 }}>YIM Information Tech</Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Right Side: Text Content */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="overline" sx={{ color: '#1976d2', fontWeight: 700, letterSpacing: '0.1em' }} gutterBottom>
                            About Company
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: '#1a237e', lineHeight: 1.3 }}>
                            고객과 함께 성장하는<br />
                            IT 토탈 솔루션 파트너
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                            와이엠 정보통신은 급변하는 디지털 환경 속에서 고객의 성공적인 비즈니스를 지원하기 위해 설립되었습니다.
                            <br /><br />
                            우리는 단순한 시스템 구축을 넘어, 고객의 환경에 최적화된 통신, 네트워크, 보안 솔루션을 통합적으로 제공합니다.
                            풍부한 현장 경험과 전문적인 기술력을 바탕으로, 여러분의 든든한 디지털 파트너가 되겠습니다.
                        </Typography>

                        {/* Core Values */}
                        <Stack spacing={3}>
                            {[
                                { icon: <BusinessIcon />, title: "전문성 (Professionalism)", desc: "최고의 기술력과 노하우로 최적의 솔루션을 제공합니다." },
                                { icon: <GroupsIcon />, title: "고객 중심 (Customer Focus)", desc: "고객의 입장에서 생각하고, 고객의 성공을 최우선으로 합니다." },
                                { icon: <HandshakeIcon />, title: "무한 책임 (Responsibility)", desc: "구축부터 유지보수까지 끝까지 책임집니다." }
                            ].map((value, index) => (
                                <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1.5, bgcolor: '#e3f2fd', borderRadius: '50%', color: '#1565c0', display: 'flex' }}>
                                        {value.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0d47a1' }}>
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {value.desc}
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CompanySection;
