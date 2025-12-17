import { useState } from 'react';
import { Box, Typography, Modal, Fade, Backdrop, Button } from '@mui/material';
import PostCard from './PostCard';
import { getDisplayableImageUrl } from './imageUtils';
import type { Post } from './types';
import CloseIcon from '@mui/icons-material/Close';
import GoogleAd from '../../components/GoogleAd';

interface PostListProps {
  posts: Post[];
  loading: boolean;
}

const PostList = ({ posts, loading }: PostListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleAds, setVisibleAds] = useState<Set<number>>(new Set());

  const handleAdLoad = (index: number) => {
    setVisibleAds(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  if (posts.length === 0 && !loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#111', borderRadius: 0, border: '1px dashed #333' }}>
        <Typography variant="h6" color="text.secondary" fontFamily="monospace">DATA_NOT_FOUND</Typography>
        <Typography variant="body2" color="#666" sx={{ mt: 1, fontFamily: 'monospace' }}>Be the first to upload shame.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 4,
        }}
      >
        {posts.map((post, index) => (
          <>
            <PostCard key={post.id} post={post} index={posts.length - index} onClick={handleCardClick} />
            {/* Every 6th item: Ad Card */}
            {(index + 1) % 6 === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // If not visible, remove from flow using absolute positioning + 0 dim
                  position: visibleAds.has(index) ? 'relative' : 'absolute',
                  width: visibleAds.has(index) ? 'auto' : 0,
                  height: visibleAds.has(index) ? '100%' : 0,
                  visibility: visibleAds.has(index) ? 'visible' : 'hidden',
                  overflow: 'hidden',

                  border: visibleAds.has(index) ? '1px solid #333' : 'none',
                  bgcolor: visibleAds.has(index) ? '#0a0a0a' : 'transparent',
                  transition: 'opacity 0.5s ease',
                  opacity: visibleAds.has(index) ? 1 : 0
                }}
              >
                {/* Header Decoration matching PostCard */}
                <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #222', display: visibleAds.has(index) ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#111' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    ADVERTISEMENT
                  </Typography>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled', opacity: 0.5 }} />
                </Box>

                {/* Ad Content Area - Centered */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0, bgcolor: visibleAds.has(index) ? '#000' : 'transparent' }}>
                  <GoogleAd
                    slotId="7566922768"
                    style={{ display: 'block', width: '100%' }}
                    onAdLoaded={() => handleAdLoad(index)}
                  />
                </Box>
              </Box>
            )}
          </>
        ))}
      </Box>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.85)' } } }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#1a1a1a',
              boxShadow: '0 0 50px rgba(0,0,0,0.8)',
              border: '1px solid #444',
              borderRadius: 0,
              p: 0,
              maxWidth: 600,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              outline: 'none',
              color: '#fff'
            }}
          >
            {selectedPost && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderBottom: '1px solid #333' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    CASE_FILE: {selectedPost.title}
                  </Typography>
                  {selectedPost.achieved_at && (
                    <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', fontFamily: 'monospace' }}>
                      OCCURRED: {selectedPost.achieved_at}
                    </Typography>
                  )}
                  <Button
                    onClick={closeModal}
                    sx={{
                      minWidth: 0,
                      p: 1,
                      color: '#ddd',
                      border: '1px solid #444',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'error.main', // Red on hover to signify "Close"
                        color: '#fff',
                        borderColor: 'error.main',
                        boxShadow: '0 0 10px red'
                      }
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </Box>

                {/* Media Display Area */}
                {(selectedPost.image || selectedPost.video) && (
                  <Box sx={{ width: '100%', bgcolor: '#000', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #333' }}>
                    {selectedPost.video ? (
                      <video
                        controls
                        autoPlay
                        src={getDisplayableImageUrl(selectedPost.video)}
                        style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                      />
                    ) : (
                      <img
                        src={getDisplayableImageUrl(selectedPost.image)}
                        alt={selectedPost.title}
                        style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                      />
                    )}
                  </Box>
                )}

                <Box sx={{ p: 4 }}>
                  <Typography sx={{ whiteSpace: 'pre-wrap', color: '#ddd', lineHeight: 1.8, mb: 4, fontFamily: 'sans-serif' }}>
                    {selectedPost.content}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PostList;
