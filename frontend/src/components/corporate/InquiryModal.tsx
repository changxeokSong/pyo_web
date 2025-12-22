import { useState, useRef } from 'react';
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
    // Refs for auto-focus
    const nameRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null); // Select is tricky to focus directly, but we can focus the parent or label
    const messageRef = useRef<HTMLInputElement>(null);
    const agreeRef = useRef<HTMLInputElement>(null); // For privacy checkbox

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        category: 'quote',
        message: '',
        agreed: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = () => {
        // 1. Required Fields Check (Empty)
        if (!formData.name.trim()) {
            setError('성함을 입력해주세요.');
            nameRef.current?.focus();
            return false;
        }
        if (!formData.company.trim()) {
            setError('회사명을 입력해주세요.');
            companyRef.current?.focus();
            return false;
        }
        if (!formData.phone.trim()) {
            setError('연락처를 입력해주세요.');
            phoneRef.current?.focus();
            return false;
        }
        if (!formData.email.trim()) {
            setError('이메일을 입력해주세요.');
            emailRef.current?.focus();
            return false;
        }

        // 2. Format Validation
        const phoneRegex = /^[0-9-]{9,20}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('연락처는 숫자와 하이픈(-)만 입력 가능합니다.');
            phoneRef.current?.focus();
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('올바른 이메일 형식이 아닙니다.');
            emailRef.current?.focus();
            return false;
        }

        if (!formData.message.trim()) {
            setError('문의 내용을 입력해주세요.');
            messageRef.current?.focus();
            return false;
        }

        // 3. Agreement Check
        if (!formData.agreed) {
            setError('개인정보 수집 및 이용에 동의해주세요.');
            // Checkbox doesn't have a direct focusable input ref exposed easily in all MUI versions,
            // but we can try to scroll into view or focus the label wrapper if strict focus isn't working.
            // For now, let's just error. The user will see the red text or alert.
            // Or better, scroll the container to bottom?
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setSubmitted(true);
        setError(null);

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { agreed, ...submitData } = formData;

            const response = await fetch('/api/inquiries/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Server Error:', errorData);
                const errorMessage = Object.entries(errorData)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n') || '전송 중 오류가 발생했습니다.';
                throw new Error(errorMessage);
            }

            alert('문의가 성공적으로 접수되었습니다.\n담당자가 확인 후 신속히 연락드리겠습니다.');
            setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                category: 'quote',
                message: '',
                agreed: false,
            });
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.message || '문의 전송에 실패했습니다.');
        } finally {
            setSubmitted(false);
        }
    };

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { margin: { xs: 2, sm: 3 }, maxHeight: 'calc(100% - 32px)' }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1, pt: 2 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">상담 및 견적 문의</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.875rem' }}>
                        고객님의 비즈니스에 최적화된 솔루션을 제안해 드립니다.
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ mt: -0.5, mr: -1 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
                {error && (
                    <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {submitted && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        문의를 전송하고 있습니다...
                    </Alert>
                )}

                <Stack spacing={2} sx={{ mt: 0.5 }}>
                    {/* Compact Row 1: Name & Company */}
                    <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1.5}>
                        <TextField
                            label="성함"
                            fullWidth
                            required
                            size="small"
                            value={formData.name}
                            onChange={handleChange('name')}
                            disabled={submitted}
                            inputRef={nameRef}
                        />
                        <TextField
                            label="회사명"
                            fullWidth
                            required
                            size="small"
                            value={formData.company}
                            onChange={handleChange('company')}
                            disabled={submitted}
                            inputRef={companyRef}
                        />
                    </Stack>

                    {/* Compact Row 2: Phone & Email */}
                    <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1.5}>
                        <TextField
                            label="연락처"
                            fullWidth
                            required
                            size="small"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            disabled={submitted}
                            placeholder="010-0000-0000"
                            inputRef={phoneRef}
                        />
                        <TextField
                            label="이메일"
                            fullWidth
                            required
                            type="email"
                            size="small"
                            value={formData.email}
                            onChange={handleChange('email')}
                            disabled={submitted}
                            placeholder="example@co.kr"
                            inputRef={emailRef}
                        />
                    </Stack>

                    <FormControl fullWidth disabled={submitted} size="small">
                        <InputLabel>문의 유형</InputLabel>
                        <Select
                            value={formData.category}
                            label="문의 유형"
                            onChange={handleChange('category')}
                            inputRef={categoryRef}
                        >
                            <MenuItem value="quote">솔루션 견적/도입 문의</MenuItem>
                            <MenuItem value="maintenance">유지보수/장애 접수</MenuItem>
                            <MenuItem value="partnership">협력/제안</MenuItem>
                            <MenuItem value="other">기타 문의</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="문의 내용"
                        multiline
                        rows={6}
                        fullWidth
                        size="small"
                        value={formData.message}
                        onChange={handleChange('message')}
                        placeholder="문의하실 내용을 간략히 적어주세요."
                        disabled={submitted}
                        inputRef={messageRef}
                    />

                    {/* Compact Privacy Agreement */}
                    <Box sx={{
                        bgcolor: '#f8f9fa',
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                        opacity: submitted ? 0.7 : 1
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.agreed}
                                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                    color="primary"
                                    size="small"
                                    disabled={submitted}
                                    inputRef={agreeRef}
                                    sx={{ py: 0.5 }} // Reduce vertical padding of checkbox
                                />
                            }
                            label={
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.9rem', pt: 0.2 }}>
                                    [필수] 개인정보 수집 및 이용 동의
                                </Typography>
                            }
                            sx={{ m: 0, alignItems: 'flex-start', width: '100%' }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, ml: 3.5, lineHeight: 1.6, fontSize: '0.75rem' }}>
                            <Box component="span" sx={{ display: 'block', mb: 0.5 }}>· 수집 목적: 문의 회신 및 상담</Box>
                            <Box component="span" sx={{ display: 'block', mb: 0.5 }}>· 수집 항목: 성함, 회사명, 연락처, 이메일, 문의내용</Box>
                            <Box component="span" sx={{ display: 'block' }}>· 보존 기간: 1년 (※ 동의 거부 시 접수 불가)</Box>
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 1.5 }}>
                <Button onClick={onClose} color="inherit" size="small">
                    취소
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={submitted}
                    size="medium"
                    sx={{ px: 3 }}
                >
                    {submitted ? '전송 중...' : '문의하기'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InquiryModal;
