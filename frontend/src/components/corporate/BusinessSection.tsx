import { Box, Container, Typography, Card, Divider, Chip } from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';

const serviceCategories = [
    {
        title: 'Communication',
        description: '효율적인 업무 소통을 위한 최첨단 통신 솔루션',
        icon: <SettingsInputComponentIcon fontSize="large" />,
        items: ['IP-PBX', 'IP-Phone', 'Key-Phone', '교환기'],
    },
    {
        title: 'Network & Infra',
        description: '안정적인 네트워크 환경 구축 및 공사',
        icon: <LanguageIcon fontSize="large" />,
        items: ['정보통신공사', '광케이블접속', '네트워크 구축', '기업 인터넷'],
    },
    {
        title: 'Store & Security',
        description: '매장 운영 효율화 및 보안 시스템',
        icon: <SecurityIcon fontSize="large" />,
        items: ['CCTV / 보안', '테이블오더', '서빙로봇', 'POS 시스템', '방송설비', 'TV 설치'],
    },
    {
        title: 'Maintenance',
        description: 'PC 및 시스템 유지보수 토탈 케어',
        icon: <SettingsInputComponentIcon fontSize="large" />, // Reuse existing icon to be safe
        items: ['컴퓨터 판매/수리', '시스템 유지보수', '전산 장비 관리'],
    },
];

const BusinessSection = () => {
    return (
        <Box sx={{ py: 10, bgcolor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: '#0d47a1', fontWeight: 700, letterSpacing: '0.1em' }}>
                        Our Services
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2, color: '#1a237e' }}>
                        Total IT & Communication
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', maxWidth: 700, mx: 'auto' }}>
                        와이엠 정보통신은 통신, 네트워크, 보안, 그리고 매장 솔루션까지<br />
                        고객에게 필요한 모든 IT 인프라를 구축하고 책임집니다.
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 4
                }}>
                    {serviceCategories.map((category, index) => (
                        <Card
                            key={index}
                            elevation={0}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'flex-start',
                                p: 4,
                                borderRadius: 4,
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                                    borderColor: '#90caf9',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor: '#e3f2fd',
                                    color: '#1565c0',
                                    mr: { xs: 0, sm: 3 },
                                    mb: { xs: 2, sm: 0 },
                                }}
                            >
                                {category.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#0d47a1' }}>
                                    {category.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {category.description}
                                </Typography>
                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {category.items.map((item, idx) => (
                                        <Chip
                                            key={idx}
                                            label={item}
                                            size="small"
                                            sx={{
                                                bgcolor: '#ffffff',
                                                border: '1px solid #e0e0e0',
                                                fontWeight: 500,
                                                color: '#424242'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BusinessSection;
