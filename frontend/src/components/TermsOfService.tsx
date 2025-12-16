import { Box, Typography, Button, Modal, Divider } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

interface TermsOfServiceProps {
    open: boolean;
    onClose: () => void;
}

const TermsOfService = ({ open, onClose }: TermsOfServiceProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="tos-modal-title"
            aria-describedby="tos-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', md: 600 },
                    bgcolor: '#0a0a0a',
                    border: '2px solid #00ff41',
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                    p: 0,
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #333', bgcolor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="h2" sx={{ fontFamily: 'monospace', color: '#00ff41', fontWeight: 700 }}>
            /// UNIVERSAL SHAME AGREEMENT
                    </Typography>
                </Box>

                {/* Content */}
                <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, fontFamily: 'monospace', color: '#ccc' }}>
                    <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                        문서 번호: #NA-TOS-2025-v1<br />
                        발효 일자: 즉시
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#fff', mb: 1, mt: 3 }}>제 1 조 (목적)</Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        본 약관('노답 아카이브 이용약관')은 사용자가 본인의, 혹은 타인의 흑역사를 '노답 아카이브'에 박제함에 있어 필요한 권리, 의무 및 무자비한 조리돌림에 대한 책임 사항을 규정함을 목적으로 합니다. 이 사이트는 귀하의 이불킥을 장려합니다.
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#fff', mb: 1, mt: 3 }}>제 2 조 (저작권 및 초상권의 영구적 포기)</Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        1. 귀하가 '업로드' 버튼을 누르는 순간, 해당 콘텐츠에 대한 모든 저작권 및 사용권은 '노답 아카이브'에 영구 귀속됩니다.<br />
                        2. 업로드된 자료가 타인의 초상권을 침해하여 발생하는 모든 법적 분쟁에 대해 관리자는 "몰루?" 자세를 견지하며, 모든 책임은 업로더 본인에게 있습니다.<br />
                        3. "술 취해서 그랬어요", "장난이었어요" 등의 변명은 시스템상에서 자동 차단됩니다.
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#fff', mb: 1, mt: 3 }}>제 3 조 (삭제 불가 원칙)</Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        원칙적으로 한번 박제된 데이터는 삭제되지 않습니다. 다만, 다음의 경우 예외를 인정할 수 있습니다:<br />
                        1. 서버 관리자에게 막대한 뇌물(피자, 치킨 등)을 제공한 경우<br />
                        2. 지구가 멸망한 경우<br />
                        3. 작성자가 3대가 덕을 쌓아 기적적으로 해탈한 경우
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#fff', mb: 1, mt: 3 }}>제 4 조 (면책 조항)</Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        본 사이트에 게시된 내용으로 인해 발생하는 사회적 매장, 연인 간의 결별, 취업 실패 등에 대해 '노답 아카이브' 및 운영진은 어떠한 책임도 지지 않습니다. 억울하면 착하게 사셨어야죠.
                    </Typography>

                    <Divider sx={{ my: 3, borderColor: '#333' }} />

                    <Typography variant="body2" sx={{ color: 'error.main', fontStyle: 'italic' }}>
                        ※ 본 약관을 읽지 않아 발생하는 모든 불이익은 전적으로 귀하의 책임입니다. 물론 읽어도 불이익은 피할 수 없습니다.
                    </Typography>
                </Box>

                {/* Footer */}
                <Box sx={{ p: 2, borderTop: '1px solid #333', bgcolor: '#111', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        startIcon={<DoneIcon />}
                        sx={{
                            bgcolor: '#00ff41',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#00cc33' }
                        }}
                    >
                        확인 (넵)
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TermsOfService;
