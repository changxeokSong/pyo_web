import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Alert,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface InquiryModalProps {
    open: boolean;
    onClose: () => void;
}

const InquiryModal = ({ open, onClose }: InquiryModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        type: 'solution',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name || !formData.company || !formData.phone || !formData.email) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        // Mock functionality: Show success message/alert
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                type: 'solution',
                message: '',
            });
            onClose();
            alert('문의가 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
        }, 1500);
    };

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6" fontWeight="bold">솔루션 문의하기</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {submitted ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        문의를 전송하고 있습니다...
                    </Alert>
                ) : (
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="성함 (Name)"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange('name')}
                        />
                        <TextField
                            label="회사명 (Company)"
                            fullWidth
                            required
                            value={formData.company}
                            onChange={handleChange('company')}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="연락처 (Phone)"
                                fullWidth
                                required
                                value={formData.phone}
                                onChange={handleChange('phone')}
                            />
                            <TextField
                                label="이메일 (Email)"
                                fullWidth
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                        </Stack>
                        <FormControl fullWidth>
                            <InputLabel>문의 유형</InputLabel>
                            <Select
                                value={formData.type}
                                label="문의 유형"
                                onChange={handleChange('type')}
                            >
                                <MenuItem value="solution">솔루션 도입 문의</MenuItem>
                                <MenuItem value="partnership">제휴 및 파트너십</MenuItem>
                                <MenuItem value="recruit">채용 관련</MenuItem>
                                <MenuItem value="other">기타</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="문의 내용"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.message}
                            onChange={handleChange('message')}
                            placeholder="문의하실 내용을 간략히 적어주세요."
                        />
                    </Stack>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">
                    취소
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={submitted}
                >
                    {submitted ? '전송 중...' : '문의하기'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InquiryModal;
