import { useState } from 'react';
import { Box, Typography, Modal, Fade, Backdrop, Button, useMediaQuery } from '@mui/material';
import PostCard from './PostCard';
import type { Post } from './types';

interface PostListProps {
  posts: Post[];
  loading: boolean;
}

const PostList = ({ posts, loading }: PostListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleCardClick = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <Box
      component="section"
      id="gallery"
      sx={{
        mt: 8,
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(84, 148, 255, 0.2)',
          boxShadow: '0 30px 60px rgba(65, 119, 255, 0.2)',
          p: { xs: 3, md: 5 },
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '-25% auto auto -15%',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(54,195,255,0.12)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative' }}>
        <Typography variant="h4" component="h2">
          표주상님의 위대한 업적들
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, mb: 4 }}>
          보는 순간 전율이 흐르는 순간들을 한 눈에 감상하세요.
        </Typography>

        {posts.length === 0 && !loading ? (
          <Box
            sx={{
              mt: 4,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 24,
              border: '1px dashed rgba(74,165,255,0.4)',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: 'inset 0 0 35px rgba(89,147,255,0.08)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              아직 기록된 업적이 없습니다.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              당신이 바로 첫 번째 전설이 될 차례입니다. 지금 바로 업적을 올려 주변을 놀라게 해보세요!
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={
                isMobile
                  ? {
                      display: 'flex',
                      gap: 3,
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      pb: 2,
                      pt: 1,
                      width: '100%',
                      '&::-webkit-scrollbar': { display: 'none' },
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: 4,
                      py: 1,
                    }
              }
            >
              {posts.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    scrollSnapAlign: isMobile ? 'center' : undefined,
                    minWidth: isMobile ? '82%' : undefined,
                  }}
                >
                  <PostCard post={post} onCelebrate={handleCardClick} compact={isMobile} />
                </Box>
              ))}
            </Box>

            <Modal
              open={modalOpen}
              onClose={closeModal}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 500 } }}
            >
              <Fade in={modalOpen}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(255,255,255,0.98)',
                    boxShadow: '0 25px 55px rgba(32,51,80,0.25)',
                    borderRadius: 8,
                    p: { xs: 4, md: 5 },
                    textAlign: 'center',
                    maxWidth: 440,
                    width: '90%',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    축하합니다!
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.6,
                    }}
                  >
                    {modalMessage}
                  </Typography>
                  <Button variant="contained" onClick={closeModal}>
                    닫기
                  </Button>
                </Box>
              </Fade>
            </Modal>
          </>
        )}
        </Box>
      </Box>
    </Box>
  );
};

export default PostList;
