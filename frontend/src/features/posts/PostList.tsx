import { useState } from 'react';
import { Box, Typography, Modal, Fade, Backdrop, Button, useMediaQuery } from '@mui/material';
import PostCard from './PostCard';
import type { Post } from './types';
import CloseIcon from '@mui/icons-material/Close';

interface PostListProps {
  posts: Post[];
  loading: boolean;
}

const PostList = ({ posts, loading }: PostListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const isMobile = useMediaQuery('(max-width:768px)');

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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={handleCardClick} compact={isMobile} />
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
                  <Button onClick={closeModal} sx={{ minWidth: 0, p: 1, color: '#aaa' }}>
                    <CloseIcon />
                  </Button>
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography sx={{ whiteSpace: 'pre-line', color: '#ddd', lineHeight: 1.8, mb: 4, fontFamily: 'sans-serif' }}>
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
