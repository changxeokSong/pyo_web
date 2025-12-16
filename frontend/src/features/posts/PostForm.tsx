import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Paper } from '@mui/material';
import TermsOfService from '../../components/TermsOfService';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import type { Post } from './types';

interface PostFormProps {
  onPostCreated: (newPost: Post) => void;
  setError: (error: string | null) => void;
}

const PostForm = ({ onPostCreated, setError }: PostFormProps) => {
  const [postTitle, setPostTitle] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);
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

    if (!postImage && !postVideo) {
      alert('증거 불충분: 사진 또는 영상을 반드시 첨부하십시오.');
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
      setLoading(true);
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
        throw new Error(`HTTP error! status: ${response.status} `);
      }

      const newPost: Post = await response.json();
      onPostCreated(newPost);
      setPostTitle('');
      setLocation('');
      setAchievedAt('');
      setPostContent('');
      setPostImage(null);
      setPostVideo(null);
      setAgreed(false); // Reset TOS agreement
      alert('데이터 아카이빙 완료.');
    } catch (error) {
      console.error("Error creating post:", error);
      if (!error || !(error instanceof Error)) {
        setError("시스템 오류: 잠시 후 다시 시도하십시오.");
      }
    } finally {
      setLoading(false);
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
          placeholder="예: 2025년 "
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

      <Box sx={{ mb: 4, p: 2, border: '1px dashed #333', bgcolor: '#0a0a0a' }}>
        <Typography variant="subtitle2" sx={{ color: '#666', mb: 2, fontFamily: 'monospace' }}>
          [ EVIDENCE_ATTACHMENT ]
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Button
              component="label"
              variant="outlined"
              color={postImage ? "primary" : "secondary"}
              startIcon={<FileUploadIcon />}
              fullWidth
              sx={{ borderRadius: 0, py: 1.5, borderStyle: postImage ? 'solid' : 'dashed' }}
            >
              {postImage ? "사진 변경" : "증거 사진 첨부"}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {postImage && (
              <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'primary.main', fontFamily: 'monospace', textAlign: 'center' }}>
                DETECTED: {postImage.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Button
              component="label"
              variant="outlined"
              color={postVideo ? "primary" : "secondary"}
              startIcon={<FileUploadIcon />}
              fullWidth
              sx={{ borderRadius: 0, py: 1.5, borderStyle: postVideo ? 'solid' : 'dashed' }}
            >
              {postVideo ? "영상 변경" : "증거 영상 첨부"}
              <input type="file" hidden accept="video/mp4,video/quicktime" onChange={handleVideoChange} />
            </Button>
            {postVideo && (
              <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'primary.main', fontFamily: 'monospace', textAlign: 'center' }}>
                DETECTED: {postVideo.name}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <TermsOfService
        open={tosOpen}
        onClose={() => setTosOpen(false)}
        onAgree={() => setAgreed(true)}
      />

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              sx={{
                color: '#666',
                '&.Mui-checked': { color: '#00ff41' },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: '#aaa', fontFamily: 'monospace' }}>
              <span
                style={{ color: '#00ff41', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={(e) => {
                  e.preventDefault();
                  setTosOpen(true);
                }}
              >
                [ 악마의 계약서 ]
              </span>
              에 서명합니다. (이용약관 동의)
            </Typography>
          }
        />

        <Button
          fullWidth
          variant="contained"
          disabled={!agreed}
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 2,
            fontSize: '1.2rem',
            bgcolor: agreed ? '#00ff41' : '#333',
            color: agreed ? '#000' : '#666',
            '&:hover': {
              bgcolor: agreed ? '#00cc33' : '#333'
            }
          }}
        >
          {loading ? 'ARCHIVING...' : '흑역사 영구 박제 (UPLOAD)'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PostForm;
