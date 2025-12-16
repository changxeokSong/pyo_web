import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Post } from './types';
import { getDisplayableImageUrl } from './imageUtils';

interface PostCardProps {
  post: Post;
  index?: number;
  onClick?: (post: Post) => void;
}

const PostCard = ({ post, index, onClick }: PostCardProps) => {
  const imageUrl = getDisplayableImageUrl(post.image);
  const videoUrl = getDisplayableImageUrl(post.video);
  const hasMedia = Boolean(imageUrl || videoUrl);

  const creationDate = new Date(post.created_at || '').toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const locationLabel = post.location?.trim() || 'UNIDENTIFIED';
  const caseNumber = index !== undefined ? index : post.id;

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 0,
        border: '1px solid #333',
        bgcolor: '#0a0a0a',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 0 15px rgba(0,255,65,0.1)',
          transform: 'translateY(-2px)'
        },
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={() => onClick && onClick(post)}
    >
      {/* Header Decoration */}
      <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#111' }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          CASE_NO.{caseNumber}
        </Typography>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main', boxShadow: '0 0 5px red' }} />
      </Box>

      {hasMedia && (
        <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '65%' }}>
          {imageUrl ? (
            <CardMedia
              component="img"
              image={imageUrl}
              alt={post.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(0.6) contrast(1.2)', // Gritty look
                transition: 'filter 0.3s',
                '.MuiCard-root:hover &': {
                  filter: 'grayscale(0) contrast(1)'
                }
              }}
            />
          ) : (
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                src={videoUrl || ""}
                muted
                loop
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.8)' }}
              />
            </Box>
          )}

          {post.video && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'rgba(0,0,0,0.6)',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 40, color: '#fff' }} />
            </Box>
          )}

          <Box
            className="media-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0a0a0a 0%, transparent 50%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Chip
              icon={<PlaceIcon sx={{ fontSize: '0.9rem !important', color: '#000 !important' }} />}
              label={locationLabel}
              size="small"
              sx={{ bgcolor: 'secondary.main', color: '#000', fontWeight: 'bold', alignSelf: 'flex-start', borderRadius: 0 }}
            />
          </Box>
        </Box>
      )}

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.4, color: '#fff' }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, flexGrow: 1, color: '#aaa', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {post.content}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#555', fontSize: '0.75rem', mt: 'auto', borderTop: '1px dashed #333', pt: 2, fontFamily: 'monospace' }}>
          <FingerprintIcon fontSize="inherit" />
          {post.achieved_at ? `${post.achieved_at}` : `${creationDate} DECLASSIFIED`}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
