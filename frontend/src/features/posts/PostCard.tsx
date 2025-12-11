import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import type { Post } from './types';
import { getDisplayableImageUrl } from './imageUtils';

interface PostCardProps {
  post: Post;
  onCelebrate: (message: string) => void;
  compact?: boolean;
}

const PostCard = ({ post, onCelebrate, compact = false }: PostCardProps) => {
  const imageUrl = getDisplayableImageUrl(post.image);
  const videoUrl = getDisplayableImageUrl(post.video);
  const hasMedia = Boolean(imageUrl || videoUrl);
  const originalSource = imageUrl || videoUrl;

  const creationDate = new Date(post.created_at || '').toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const triggerCelebration = () => {
    const message = `축하합니다!
표주상님이 "${post.title}" 업적으로
새로운 전설을 쓰고 있습니다!`;
    onCelebrate(message);
  };

  const openOriginal = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (originalSource) {
      window.open(originalSource, '_blank', 'noopener,noreferrer');
    }
  };

  const locationLabel = post.location?.trim() || '장소 정보 없음';
  const timeLabel = post.achieved_at?.trim() || '시간 정보 없음';

  return (
    <Card
      className="static-text"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: compact ? '24px' : '32px',
        border: '1px solid rgba(255,255,255,0.6)',
        background: 'linear-gradient(180deg, #0B1F35 0%, #091623 60%, #051019 100%)',
        boxShadow: '0 25px 45px rgba(7, 15, 30, 0.55)',
        color: '#E5F3FF',
        cursor: hasMedia ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: hasMedia ? 'translateY(-6px)' : undefined,
          boxShadow: hasMedia ? '0 35px 60px rgba(6, 12, 24, 0.65)' : undefined,
        },
        '&:active': {
          transform: hasMedia ? 'translateY(-2px) scale(0.99)' : undefined,
        },
        minHeight: compact ? 480 : 520,
      }}
      onClick={hasMedia ? triggerCelebration : undefined}
    >
      {hasMedia && (
        <Box sx={{ position: 'relative' }}>
          {imageUrl ? (
            <CardMedia
              component="img"
              height={compact ? 260 : 380}
              image={imageUrl}
              alt={post.title}
              sx={{
                objectFit: 'cover',
                width: '100%',
                filter: 'saturate(1.05)',
                backgroundColor: '#050a15',
              }}
            />
          ) : (
            <CardMedia
              component="video"
              controls
              playsInline
              preload="metadata"
              onClick={(event) => {
                event.stopPropagation();
              }}
              src={videoUrl as string}
              sx={{
                width: '100%',
                height: compact ? 260 : 380,
                objectFit: 'cover',
                backgroundColor: '#050a15',
              }}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(12,19,38,0.15) 0%, rgba(7,12,24,0.85) 100%)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 18,
              left: 24,
              right: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 999,
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.4em',
                background: 'rgba(255,255,255,0.35)',
                color: '#fff',
              }}
            >
              {videoUrl ? 'GLORY CLIP' : 'GLORY MOMENT'}
            </Typography>
            {originalSource && (
              <Typography
                component="button"
                onClick={openOriginal}
                sx={{
                  border: '1px solid rgba(255,255,255,0.7)',
                  borderRadius: 999,
                  px: 1.5,
                  py: 0.3,
                  background: 'rgba(0,0,0,0.35)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                }}
              >
                원본
              </Typography>
            )}
          </Box>
        </Box>
      )}
      <CardContent sx={{ p: { xs: compact ? 2.5 : 3, md: 4 } }}>
        <Typography
          variant={compact ? 'h6' : 'h5'}
          className="static-text"
          sx={{ fontWeight: 700, color: '#fff', mb: 1 }}
        >
          {post.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 2,
              py: 0.6,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.9rem',
              userSelect: 'none',
              opacity: post.location ? 1 : 0.55,
            }}
          >
            <PlaceIcon sx={{ fontSize: '1rem' }} />
            {locationLabel}
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 2,
              py: 0.6,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.9rem',
              userSelect: 'none',
              opacity: post.achieved_at ? 1 : 0.55,
            }}
          >
            <ScheduleIcon sx={{ fontSize: '1rem' }} />
            {timeLabel}
          </Box>
        </Box>

        <Typography
          className="static-text"
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            color: 'rgba(229,243,255,0.75)',
            fontSize: compact ? '0.98rem' : '1.04rem',
            minHeight: compact ? '3.2rem' : '4rem',
          }}
        >
          {post.content}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'rgba(219,236,255,0.7)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
            <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
            <Typography variant="caption" sx={{ letterSpacing: '0.08em' }}>
              기록일 {creationDate}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #36C3FF, #5C7CFF)',
              boxShadow: '0 0 20px rgba(90,147,255,0.5)',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
