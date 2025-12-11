import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { Announcement } from './types';

interface AnnouncementBoxProps {
  announcements: Announcement[];
}

const AnnouncementBox = ({ announcements }: AnnouncementBoxProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const latest = announcements[0];

  if (!latest) {
    return (
      <Box
        sx={{
          px: { xs: 3, md: 4 },
          py: { xs: 3, md: 4 },
          mb: 6,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(186,208,255,0.6)',
          textAlign: 'center',
          color: '#032542',
          boxShadow: '0 25px 50px rgba(10, 30, 60, 0.18)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.2em' }}>
          📢 표주상님의 명령을 기다리는 중
        </Typography>
        <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>
          아직 등록된 공지가 없습니다. 곧 내려질 위대한 명령을 기다려주세요!
        </Typography>
      </Box>
    );
  }

  const highlightDate = new Date(latest.created_at).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const history = announcements.slice(1, 6);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 3, md: 4 },
        py: { xs: 3, md: 4 },
        mb: 6,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.95)',
        color: '#032542',
        border: '1px solid rgba(186,208,255,0.6)',
        boxShadow: '0 25px 50px rgba(10, 30, 60, 0.18)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-20% auto auto -10%',
          width: 220,
          height: 220,
          background: 'rgba(92,156,255,0.25)',
          filter: 'blur(35px)',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto -15% -35% auto',
          width: 180,
          height: 180,
          background: 'rgba(110,188,255,0.25)',
          filter: 'blur(30px)',
          borderRadius: '50%',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography variant="h6" component="p" className="static-text" sx={{ fontWeight: 800, letterSpacing: '0.2em' }}>
          📢 표주상님의 중 대 발 표 !
        </Typography>
        <Typography
          variant="body1"
          className="static-text"
          sx={{ mt: 1.5, fontSize: '1.05rem', whiteSpace: 'pre-line' }}
        >
          {latest.content}
        </Typography>
        <Typography
          variant="caption"
          className="static-text"
          sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 1, color: 'rgba(4,34,63,0.6)' }}
        >
          📅 게시일 {highlightDate}
        </Typography>
      </Box>

      {history.length > 0 && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(15,29,43,0.08)' }}>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="text"
            sx={{ fontWeight: 700, color: '#fff' }}
          >
            {showHistory ? '최근 중대발표 접기' : '최근 중대발표 기록 보기'}
          </Button>
          {showHistory && (
            <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {history.map((entry) => (
                <Box
                  key={entry.id}
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(245,249,255,0.95)',
                    border: '1px solid rgba(54,120,188,0.15)',
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(8,24,42,0.65)', fontWeight: 600 }}>
                    {new Date(entry.created_at).toLocaleString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                  <Typography sx={{ whiteSpace: 'pre-line', mt: 0.5 }}>{entry.content}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AnnouncementBox;
