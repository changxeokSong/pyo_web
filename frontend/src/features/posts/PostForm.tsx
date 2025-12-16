import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
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
      alert('데이터 누락: 제목과 내용을 모두 입력하십시오.');
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
        let readableMessage = "업로드 실패: 서버 거부";
        if (response.status === 413) {
          readableMessage = "오류: 파일 크기 초과 (Limit: 20MB)";
        } else {
          try {
            const err = await response.json();
            readableMessage = err.detail || readableMessage;
          } catch { }
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
      alert('데이터 아카이빙 완료.');
    } catch (error) {
      console.error("Error creating post:", error);
      if (!error || !(error instanceof Error)) {
        setError("시스템 오류: 잠시 후 다시 시도하십시오.");
      }
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#0f0f0f',
      color: '#fff',
      '& fieldset': { borderColor: '#333' },
      '&:hover fieldset': { borderColor: '#555' },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
    '& .MuiInputLabel-root': { color: '#666' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        mb: 6,
        borderRadius: 0,
        bgcolor: '#111',
        border: '1px solid #333',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, width: 4, height: '100%',
          bgcolor: 'primary.main'
        }
      }}
    >
      <Box sx={{ mb: 4, pl: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>
          [ DATA_ENTRY_FORM ]
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
          /// 기록 보존 프로토콜 시작...
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        <TextField
          label="사건명 (Title)"
          variant="outlined"
          fullWidth
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          placeholder="예: 중2병의 최후"
          sx={inputSx}
        />
        <TextField
          label="발생 장소 (Location)"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 교무실 앞 복도"
          sx={inputSx}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="발생 시기 (Timestamp)"
          variant="outlined"
          fullWidth
          value={achieved_at}
          onChange={(e) => setAchievedAt(e.target.value)}
          placeholder="예: 2024.12.25 14:00"
          sx={inputSx}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="상세 기록 (Description)"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
          placeholder="그날의 흑역사를 상세히 기술하십시오."
          sx={inputSx}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, p: 2, border: '1px dashed #333', bgcolor: '#0a0a0a' }}>
        <Button
          component="label"
          variant="outlined"
          color="secondary"
          startIcon={<FileUploadIcon />}
          sx={{ borderRadius: 0 }}
        >
          증거 사진 첨부
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        {postImage && <Typography sx={{ alignSelf: 'center', fontSize: '0.875rem', color: 'secondary.main' }}>{postImage.name}</Typography>}

        <Button
          component="label"
          variant="outlined"
          color="secondary"
          startIcon={<FileUploadIcon />}
          sx={{ borderRadius: 0 }}
        >
          증거 영상 첨부
          <input type="file" hidden accept="video/mp4,video/quicktime" onChange={handleVideoChange} />
        </Button>
        {postVideo && <Typography sx={{ alignSelf: 'center', fontSize: '0.875rem', color: 'secondary.main' }}>{postVideo.name}</Typography>}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disableElevation
        startIcon={<SaveIcon />}
        sx={{ px: 4, py: 1.5, fontSize: '1rem', width: '100%' }}
      >
        <Typography sx={{ fontWeight: 800, letterSpacing: '0.2em' }}>ARCHIVE_DATA</Typography>
      </Button>
    </Paper>
  );
};

export default PostForm;
