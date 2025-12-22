import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PrivacyPolicyModalProps {
    open: boolean;
    onClose: () => void;
}

const PrivacyPolicyModal = ({ open, onClose }: PrivacyPolicyModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">개인정보처리방침</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
                <Typography variant="body1" paragraph>
                    <strong>(주)와이엠정보통신</strong>은(는) 솔루션 도입 문의를 위해 아래와 같이 개인정보를 수집·이용합니다.
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>제1조 (수집하는 개인정보의 항목)</Typography>
                    <Typography variant="body2" paragraph>
                        회사는 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br />
                        1. 수집항목: 성함, 회사명, 연락처, 이메일, 문의내용<br />
                        2. 수집방법: 홈페이지 문의하기 양식 작성
                    </Typography>

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>제2조 (개인정보의 수집 및 이용목적)</Typography>
                    <Typography variant="body2" paragraph>
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br />
                        - 고객의 솔루션 도입 문의에 대한 답변 제공 및 상담 진행<br />
                        - 견적서 발송 및 관련 비즈니스 안내
                    </Typography>

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>제3조 (개인정보의 보유 및 이용기간)</Typography>
                    <Typography variant="body2" paragraph>
                        원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br />
                        - 보존 항목: 성함, 회사명, 연락처, 이메일, 문의 이력<br />
                        - 보존 근거: 고객 문의 응대 및 중복 접수 방지, 사업 관련 근거 자료 확보<br />
                        - 보존 기간: 1년 (또는 관계 법령에 따름)
                    </Typography>

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>제4조 (개인정보의 파기절차 및 방법)</Typography>
                    <Typography variant="body2" paragraph>
                        전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
                    </Typography>

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>제5조 (문의처)</Typography>
                    <Typography variant="body2" paragraph>
                        개인정보 관련 문의는 이메일(7979dbals@naver.com)로 연락 주시기 바랍니다.
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PrivacyPolicyModal;
