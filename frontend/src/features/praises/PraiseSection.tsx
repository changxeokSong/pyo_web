import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import type { Praise } from './types';

const DONATION_ACCOUNT = `농협은행 302-1045-4203-01 (표주상)`;

const PraiseSection = () => {
  const [message, setMessage] = useState('');
  const [praises, setPraises] = useState<Praise[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchPraises = async () => {
    try {
      const response = await fetch('/api/praises/');
      if (response.ok) {
        const data: Praise[] = await response.json();
        setPraises(data);
      }
    } catch (error) {
      console.error('Failed to fetch praises', error);
    }
  };

  useEffect(() => {
    fetchPraises();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) {
      setFeedback('메시지를 입력하십시오.');
      return;
    }
    try {
      setSubmitting(true);
      setFeedback(null);
      const response = await fetch('/api/praises/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim().slice(0, 280) }),
      });
      if (!response.ok) {
        throw new Error('메시지 전송 실패');
      }
      const newPraise: Praise = await response.json();
      setPraises((prev) => [newPraise, ...prev].slice(0, 8));
      setMessage('');
      setFeedback('메시지가 영구 박제되었습니다.');
    } catch (error) {
      console.error('Failed to submit praise', error);
      setFeedback('전송 오류: 시스템이 거부했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(DONATION_ACCOUNT);
        alert('계좌 정보가 클립보드에 복사되었습니다.');
        setFeedback('계좌 정보가 클립보드에 복사되었습니다.');
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch (error) {
      console.error('Clipboard error', error);
      setFeedback('복사 실패: 수동으로 입력하십시오.');
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 3,
        width: '100%',
      }}
    >
      {/* Message Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 3, md: 4 },
          bgcolor: '#111',
          border: '1px solid #333',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, width: 4, height: '100%',
            bgcolor: 'secondary.main'
          }
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: 'secondary.main', fontFamily: 'monospace' }}>
          [ PUBLIC_COMMENTS ]
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#fff', fontFamily: 'monospace' }}>
          {'>'} 조롱의 한마디 남기기
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#888', fontFamily: 'monospace' }}>
          /// 익명성은 보장되지 않습니다 (익명이든 아니는 어쩔건데 슈바라마 ~)
        </Typography>

        <TextField
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="예) 흑역사 잘 봤습니다. 힘내세요(크큭)"
          fullWidth
          multiline
          rows={3}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'monospace',
              '& fieldset': { borderColor: '#333' },
              '&:hover fieldset': { borderColor: '#555' },
              '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {feedback ? (
            <Typography variant="caption" sx={{ color: 'primary.main', fontFamily: 'monospace' }}>
              {`>> ${feedback}`}
            </Typography>
          ) : <Box />}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={submitting}
            endIcon={<SendIcon />}
            sx={{ px: 3 }}
          >
            SEND_MESSAGE
          </Button>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 300, overflowY: 'auto', pr: 1 }}>
          {praises.map((praise) => (
            <Box
              key={praise.id}
              sx={{
                bgcolor: '#0f0f0f',
                border: '1px dashed #333',
                p: 1.5,
                borderLeft: '2px solid #555'
              }}
            >
              <Typography variant="caption" sx={{ display: 'block', color: '#555', mb: 0.5, fontFamily: 'monospace' }}>
                {new Date(praise.created_at).toLocaleString('ko-KR', {
                  month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {praise.message}
              </Typography>
            </Box>
          ))}
          {praises.length === 0 && (
            <Typography variant="body2" sx={{ color: '#444', textAlign: 'center', py: 2, fontFamily: 'monospace' }}>
              NO_MESSAGES_FOUND...
            </Typography>
          )}
        </Box>
      </Box>

      {/* Donation Section */}
      <Box
        sx={{
          p: { xs: 3, md: 4 },
          bgcolor: '#111',
          border: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Grid Bag */}
        <Box sx={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: 'primary.main', mb: 1, fontFamily: 'monospace' }}>
          [ SPONSORSHIP ]
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', mb: 3, fontFamily: 'monospace' }}>
          서버 유지비 후원<br />(및 정신적 피해보상)
        </Typography>

        <Box sx={{ bgcolor: '#000', px: 2, py: 1, mb: 3, border: '1px solid #00ff41', color: '#00ff41', fontFamily: 'monospace', fontSize: '0.9rem', width: '100%', wordBreak: 'break-all' }}>
          {DONATION_ACCOUNT}
        </Box>

        <Button
          onClick={handleCopy}
          variant="outlined"
          color="primary"
          startIcon={<ContentCopyIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          계좌 복사 (COPY)
        </Button>

        <Typography variant="caption" sx={{ color: '#666', fontFamily: 'monospace', lineHeight: 1.6 }}>
          * 후원금은 흑역사 발굴 및<br />사이트 영구 존속을 위해 사용됩니다.
        </Typography>
      </Box>
    </Box>
  );
};

export default PraiseSection;
