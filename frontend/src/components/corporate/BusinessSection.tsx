import { useState } from 'react';
import { Box, Container, Typography, Card, Divider, Chip } from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import ServiceDetailModal, { ServiceDetail } from './ServiceDetailModal';

// Enhanced Data
const serviceCategories: ServiceDetail[] = [
    {
        title: 'Communication',
        description: '효율적인 업무 소통을 위한 최첨단 통신 솔루션',
        longDescription: '기업의 규모와 환경에 맞춘 최적의 통신 솔루션을 제안합니다. 키폰, IP-PBX 등 다양한 통신 장비부터 선로 구축까지 원스톱 서비스를 제공하여 업무 효율을 극대화합니다.',
        items: ['IP-PBX (인터넷 교환기)', 'IP-Phone (인터넷 전화)', 'Key-Phone (키폰 시스템)', '교환기 설치 및 유지보수'],
        imageColor: '#1976d2',
    },
    {
        title: 'Network & Infra',
        description: '안정적인 네트워크 환경 구축 및 공사',
        longDescription: '끊김 없는 비즈니스를 위한 견고한 네트워크 인프라를 구축합니다. 사무실, 공장, 상가 등 현장 상황에 맞는 맞춤형 랜 공사와 광케이블 작업을 수행합니다.',
        items: ['정보통신공사 (구내 통신)', '광케이블 접속 및 포설', '네트워크 구축 및 설계', '기업 전용 인터넷 개통'],
        imageColor: '#0288d1',
    },
    {
        title: 'Store & Security',
        description: '매장 운영 효율화 및 보안 시스템',
        longDescription: '매장 운영을 돕는 스마트 솔루션과 안전을 책임지는 보안 시스템을 구축합니다. 테이블 오더부터 CCTV까지 매장에 필요한 모든 IT 기기를 통합 관리합니다.',
        items: ['CCTV / 보안 시스템', '테이블오더 / 키오스크', '서빙로봇 도입 및 관리', 'POS 시스템', '매장 내 방송/음향 설비'],
        imageColor: '#0097a7',
    },
    {
        title: 'Maintenance',
        description: 'PC 및 시스템 유지보수 토탈 케어',
        longDescription: '업무용 PC 판매부터 수리, 정기적인 시스템 유지보수까지 기업 IT 환경을 최상의 상태로 유지해드립니다. 전문가가 직접 방문하여 문제를 신속하게 해결합니다.',
        items: ['컴퓨터/노트북 판매 및 수리', '기업 유지보수 계약', '전산 장비 통합 관리', '소프트웨어 장애 처리'],
        imageColor: '#00796b',
    },
];

const BusinessSection = () => {
    const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleServiceClick = (service: ServiceDetail) => {
        setSelectedService(service);
        setModalOpen(true);
    };

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
                            onClick={() => handleServiceClick(category)}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'flex-start',
                                p: 4,
                                borderRadius: 4,
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
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
                                {/* Icons logic mapping based on title/index */}
                                {index === 0 && <SettingsInputComponentIcon fontSize="large" />}
                                {index === 1 && <LanguageIcon fontSize="large" />}
                                {index === 2 && <SecurityIcon fontSize="large" />}
                                {index === 3 && <SettingsInputComponentIcon fontSize="large" />}
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
                                    {category.items.slice(0, 4).map((item, idx) => (
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

            <ServiceDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                service={selectedService}
            />
        </Box>
    );
};

export default BusinessSection;
