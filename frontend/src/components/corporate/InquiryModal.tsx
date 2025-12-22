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
    Checkbox,
    FormControlLabel,
    Box,
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
        category: 'solution', // Changed from 'type' to 'category' to match backend model
        message: '',
        agreed: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.name || !formData.company || !formData.phone || !formData.email) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        if (!formData.agreed) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        setSubmitted(true);
        setError(null);

        try {
            const response = await fetch('/api/inquiries/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('전송 중 오류가 발생했습니다.');
            }

            // Success
            alert('문의가 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
            setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                category: 'solution',
                message: '',
                agreed: false,
            });
            onClose();
        } catch (err) {
            console.error(err);
            setError('문의 전송에 실패했습니다. 다시 시도해주세요.');
            alert('문의 전송에 실패했습니다. 관리자에게 문의바랍니다.');
        } finally {
            setSubmitted(false);
        }
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
                    <Alert severity="info" sx={{ mb: 2 }}>
                        문의를 전송하고 있습니다...
                    </Alert>
                ) : (
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        {error && (
                            <Alert severity="error" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}
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
                                value={formData.category}
                                label="문의 유형"
                                onChange={handleChange('category')}
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

                        {/* Privacy Agreement Checkbox */}
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.agreed}
                                        onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        [필수] 개인정보 수집 및 이용 동의
                                    </Typography>
                                }
                            />
                            <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4, mt: 0.5, lineHeight: 1.5 }}>
                                수집 목적: 솔루션 도입 문의에 대한 상담 및 회신<br />
                                수집 항목: 성함, 회사명, 연락처, 이메일, 문의내용<br />
                                보유 기간: 문의 접수 후 1년간 보관 (이후 지체 없이 파기)<br />
                                ※ 동의를 거부할 권리가 있으나, 거부 시 문의 접수가 불가능합니다.
                            </Typography>
                        </Box>
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
