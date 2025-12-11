import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import type { Post } from './types';

interface PostFormProps {
  onPostCreated: (newPost: Post) => void;
  setError: (error: string | null) => void;
}

const PostForm = ({ onPostCreated, setError }: PostFormProps) => {
  const [postTitle, setPostTitle] = useState('');
  const [location, setLocation] = useState('');
  const [achieved_at, setAchievedAt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postVideo, setPostVideo] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPostImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPostVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) {
      alert('업적명과 업적 내용을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('location', location);
    formData.append('achieved_at', achieved_at);
    formData.append('content', postContent);
    if (postImage) {
      formData.append('image', postImage);
    }
    if (postVideo) {
      formData.append('video', postVideo);
    }

    try {
      setError(null);
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let readableMessage = "게시물 생성에 실패했습니다.";
        if (response.status === 413) {
          readableMessage = "파일 용량이 너무 큽니다. 20MB 이하의 이미지나 영상을 업로드해주세요.";
        } else {
          try {
            const errorData = await response.json();
            readableMessage = errorData?.detail
              ? Array.isArray(errorData.detail)
                ? errorData.detail.join(', ')
                : errorData.detail
              : readableMessage;
          } catch {
            // ignore JSON parse errors and keep default message
          }
        }
        setError(readableMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost: Post = await response.json();
      onPostCreated(newPost);
      setPostTitle('');
      setLocation('');
      setAchievedAt('');
      setPostContent('');
      setPostImage(null);
      setPostVideo(null);
    } catch (error) {
      console.error("Error creating post:", error);
      if (!error || !(error instanceof Error)) {
        setError("게시물 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      background: '#fff',
      '& fieldset': {
        borderColor: 'rgba(54, 195, 255, 0.4)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(54, 195, 255, 0.75)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#36C3FF',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'text.secondary',
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 3, md: 5 },
        mb: 6,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(84, 148, 255, 0.2)',
        boxShadow: '0 30px 60px rgba(65, 119, 255, 0.2)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-30% auto auto -20%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(54,195,255,0.18)',
          filter: 'blur(10px)',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography variant="overline" sx={{ letterSpacing: '0.5em', color: 'primary.main' }}>
          NEW LEGEND
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 1 }}>
          표주상님의 업적을 세상에 알리세요
        </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary', userSelect: 'none' }}>
        디테일하게 입력할수록 보는 이들의 입이 떡 벌어집니다.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 3,
          }}
        >
          <TextField
            label="업적명"
            variant="outlined"
            fullWidth
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
            sx={inputSx}
          />
          <TextField
            label="장소"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <TextField
          sx={{ ...inputSx, mt: 3 }}
          label="대략적 시간 (예: 2024년 5월, 지난 주말)"
          variant="outlined"
          fullWidth
          value={achieved_at}
          onChange={(e) => setAchievedAt(e.target.value)}
        />
        <TextField
          sx={{ ...inputSx, mt: 3 }}
          label="업적 내용"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              border: '1px dashed rgba(54,195,255,0.4)',
              background: 'rgba(222, 243, 255, 0.8)',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              업적을 증명할 이미지
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              한 번 보면 빠져드는 결정적인 한 장을 업로드하세요.
            </Typography>
            <Button variant="contained" component="label" sx={{ borderRadius: 999 }}>
              이미지 선택
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {postImage && (
              <Typography sx={{ mt: 1, fontSize: '0.9rem', color: 'text.secondary' }}>{postImage.name}</Typography>
            )}
          </Box>

          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              border: '1px dashed rgba(92,129,255,0.35)',
              background: 'rgba(214, 228, 255, 0.85)',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              또는 영상으로 증명하기
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              1분 이하의 MP4 / MOV 영상을 업로드하면 재생으로 감상이 가능합니다.
            </Typography>
            <Button variant="contained" component="label" sx={{ borderRadius: 999, borderWidth: 2 }}>
              동영상 선택
              <input type="file" hidden accept="video/mp4,video/quicktime" onChange={handleVideoChange} />
            </Button>
            {postVideo && (
              <Typography sx={{ mt: 1, fontSize: '0.9rem', color: 'text.secondary' }}>{postVideo.name}</Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            모두가 기다리는 표주상님의 다음 이야기를 직접 남겨보세요.
          </Typography>
          <Button type="submit" variant="contained" size="large" sx={{ width: { xs: '100%', md: 'auto' } }}>
            업적 등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostForm;
