import { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface DeletionRequestProps {
    open: boolean;
    onClose: () => void;
}

const REASONS = [
    { value: 'shame', label: '너무 쪽팔립니다 (Extreme Shame)' },
    { value: 'drunk', label: '술 먹고 썼습니다 (Intoxication)' },
    { value: 'threat', label: '지인이 협박합니다 (External Threat)' },
    { value: 'job', label: '취업에 불이익이 있습니다 (Career Risk)' },
    { value: 'mom', label: '엄마한테 걸렸습니다 (Parental Discovery)' },
];

const DeletionRequest = ({ open, onClose }: DeletionRequestProps) => {
    const [step, setStep] = useState<'form' | 'processing' | 'done'>('form');
    const [reason, setReason] = useState('');
    const [apology, setApology] = useState('');

    const handleSubmit = () => {
        if (!reason || apology.length < 10) {
            alert("진정성이 부족합니다. 사유를 선택하고 반성문을 10자 이상 작성하십시오.");
            return;
        }
        setStep('processing');
        setTimeout(() => {
            setStep('done');
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        // Reset state after a delay ensures animation/modal close is smooth
        setTimeout(() => {
            setStep('form');
            setReason('');
            setApology('');
        }, 300);
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': { borderColor: '#333' },
            '&:hover fieldset': { borderColor: '#555' },
            '&.Mui-focused fieldset': { borderColor: '#ff0055' },
        },
        '& .MuiInputLabel-root': { color: '#666' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#ff0055' }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="deletion-modal-title"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', md: 500 },
                    bgcolor: '#0a0a0a',
                    border: '2px solid #ff0055',
                    boxShadow: '0 0 20px rgba(255, 0, 85, 0.3)',
                    p: 4,
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Box sx={{ borderBottom: '1px solid #333', pb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontFamily: 'monospace', color: '#ff0055', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeleteIcon /> 데이터 삭제 신청서
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontFamily: 'monospace' }}>
                        DOC-ID: #DEL-REQ-9999
                    </Typography>
                </Box>

                {step === 'form' && (
                    <>
                        <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                            본 아카이브의 기록 말살 형벌은 영구적이나, 예외적으로 <strong>깊은 반성</strong>이 인정되는 경우 심사를 통해 삭제가 가능할 수도 있습니다.
                        </Typography>

                        <TextField
                            select
                            label="삭제 요청 사유 (Reason)"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={inputSx}
                        >
                            {REASONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="대국민 사과문 (Apology Letter)"
                            multiline
                            rows={4}
                            value={apology}
                            onChange={(e) => setApology(e.target.value)}
                            placeholder="당시의 심정과 현재의 반성 내용을 구체적으로 기술하십시오. (최소 10자)"
                            fullWidth
                            variant="outlined"
                            sx={inputSx}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button
                                onClick={handleClose}
                                sx={{
                                    color: '#888',
                                    '&:hover': {
                                        color: '#fff',
                                        bgcolor: 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                취소
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                                startIcon={<SendIcon />}
                                sx={{ fontWeight: 'bold' }}
                            >
                                심사 요청하기
                            </Button>
                        </Box>
                    </>
                )}

                {step === 'processing' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
                        <CircularProgress color="secondary" />
                        <Typography sx={{ color: '#fff', fontFamily: 'monospace' }}>
                            진정성 분석 중... (AI Reviewing)
                        </Typography>
                    </Box>
                )}

                {step === 'done' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Alert severity="success" variant="outlined" sx={{ color: '#00ff41', borderColor: '#00ff41' }}>
                            신청이 성공적으로 접수되었습니다.
                        </Alert>
                        <Box sx={{ bgcolor: '#111', p: 2, border: '1px dashed #444' }}>
                            <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 1 }}>
                                [ 접수 결과 통보 ]
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#fff', fontFamily: 'monospace' }}>
                                - 접수 번호: #42069<br />
                                - 대기 순번: 1,402,853번째<br />
                                - 예상 처리 시간: 약 74년<br />
                                <br />
                                처리 완료 시까지 흑역사는 안전하게 게시됩니다. 감사합니다.
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
                            확인 (눈물 닦기)
                        </Button>
                    </Box>
                )}

            </Box>
        </Modal>
    );
};

export default DeletionRequest;
