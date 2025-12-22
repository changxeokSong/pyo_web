import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EmailRefusalModalProps {
    open: boolean;
    onClose: () => void;
}

const EmailRefusalModal = ({ open, onClose }: EmailRefusalModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6" fontWeight="bold">이메일 무단수집 거부</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ p: 1 }}>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                        <strong>(주)와이엠정보통신</strong> 홈페이지에 게시된 이메일 주소가 전자우편 수집 프로그램이나
                        그 밖의 기술적 장치를 이용하여 무단으로 수집되는 행위 및 사전동의 없는 영리 목적의
                        광고성 정보 게시 행위를 거부합니다.
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'error.main', fontWeight: 'bold' }}>
                        이를 위반 시, '정보통신망 이용촉진 및 정보보호 등에 관한 법률'에 의해
                        형사 처벌됨을 유념하시길 바랍니다.
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 3, textAlign: 'right' }}>
                        게시일: 2025년 01월 01일
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EmailRefusalModal;
