import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const services = [
    {
        title: 'System Integration',
        description: '고객 환경에 최적화된 시스템 설계 및 구축 서비스를 제공합니다.',
        icon: <SettingsInputComponentIcon fontSize="large" />,
    },
    {
        title: 'Network Integration',
        description: '안정적이고 효율적인 네트워크 인프라 환경을 구축합니다.',
        icon: <LanguageIcon fontSize="large" />,
    },
    {
        title: 'Security Solutions',
        description: '기업의 소중한 정보 자산을 보호하는 보안 솔루션을 제공합니다.',
        icon: <SecurityIcon fontSize="large" />,
    },
    {
        title: 'Consulting & Maintenance',
        description: '전문적인 기술 상담 및 체계적인 유지보수 서비스를 지원합니다.',
        icon: <SupportAgentIcon fontSize="large" />,
    },
];

const BusinessSection = () => {
    return (
        <Box sx={{ py: 10, bgcolor: '#f5f5f5' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: '#0d47a1', fontWeight: 700, letterSpacing: '0.1em' }}>
                        Our Business
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2, color: '#1a237e' }}>
                        Total IT Solutions
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', maxWidth: 700, mx: 'auto' }}>
                        와이엠 정보통신은 다양한 분야의 전문 기술력과 경험을 바탕으로<br />
                        고객 맞춤형 토탈 솔루션을 제안합니다.
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 4
                }}>
                    {services.map((service, index) => (
                        <Box key={index} sx={{ height: '100%' }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 3,
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 3,
                                        p: 2,
                                        borderRadius: '50%',
                                        bgcolor: '#e3f2fd',
                                        color: '#1565c0',
                                    }}
                                >
                                    {service.icon}
                                </Box>
                                <CardContent sx={{ p: 0 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BusinessSection;
