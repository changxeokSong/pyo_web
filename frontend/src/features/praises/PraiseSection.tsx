import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
      setFeedback('짧은 응원의 한마디를 입력해주세요.');
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
        throw new Error('응원 메세지를 저장할 수 없습니다.');
      }
      const newPraise: Praise = await response.json();
      setPraises((prev) => [newPraise, ...prev].slice(0, 8));
      setMessage('');
      setFeedback('전달 완료! 표주상님께 전해졌습니다.');
    } catch (error) {
      console.error('Failed to submit praise', error);
      setFeedback('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(DONATION_ACCOUNT);
        setFeedback('후원 계좌가 복사되었습니다!');
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch (error) {
      console.error('Clipboard error', error);
      setFeedback('복사에 실패했습니다. 직접 복사해주세요.');
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(84, 148, 255, 0.2)',
          boxShadow: '0 30px 60px rgba(65, 119, 255, 0.2)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '-25% auto auto -15%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(54,195,255,0.15)',
            filter: 'blur(12px)',
          }}
        />
        <Box sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ letterSpacing: '0.3em', color: 'primary.main' }}>
            표주상님에게 한마디
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            위대한 표주상님께 응원의 코멘트를 남겨주세요
          </Typography>
          <TextField
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="예) 표주상님, 오늘도 찬양 받으세요!"
            fullWidth
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: '#fff',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ mt: 2, width: '100%' }}
          >
            전송하기
          </Button>
          {feedback && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'primary.main' }}>
              {feedback}
            </Typography>
          )}
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {praises.slice(0, 5).map((praise) => (
              <Box
                key={praise.id}
                sx={{
                  borderRadius: 3,
                  background: 'rgba(239,246,255,0.9)',
                  border: '1px solid rgba(54,195,255,0.2)',
                  px: 2,
                  py: 1.5,
                  textAlign: 'left',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {new Date(praise.created_at).toLocaleString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>{praise.message}</Typography>
              </Box>
            ))}
            {praises.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                아직 남겨진 코멘트가 없습니다. 첫 응원자가 되어주세요!
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'rgba(255,255,255,0.94)',
          border: '1px solid rgba(84, 148, 255, 0.2)',
          boxShadow: '0 25px 55px rgba(55, 120, 220, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 'auto -30% -40% auto',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(94,184,255,0.22)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
        <Typography variant="overline" sx={{ letterSpacing: '0.25em', color: 'primary.main' }}>
          후원 계좌
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F1D2B' }}>
          표주상님께 사랑을 보낼 시간
        </Typography>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#0A4C7B', wordBreak: 'keep-all' }}>
          {DONATION_ACCOUNT}
        </Typography>
        <Button
          onClick={handleCopy}
          variant="contained"
          startIcon={<ContentCopyIcon />}
          sx={{
            width: '100%',
            borderRadius: 999,
            backgroundImage: 'linear-gradient(135deg, #5ee1ff, #3b7bff)',
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #4fc7e5, #3368d0)',
            },
          }}
        >
          계좌 복사하기
        </Button>
        <Typography variant="body2" sx={{ color: 'rgba(15,29,43,0.7)' }}>
          후원은 표주상님의 성대한 위업을 위한 연료입니다.
          함께 표주상님의 세계를 더 빛나게 만들어 봅시다 !
        </Typography>
      </Box>
    </Box>
  );
};

export default PraiseSection;
