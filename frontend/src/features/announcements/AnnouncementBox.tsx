import { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Divider, Paper } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { Announcement } from './types';

interface AnnouncementBoxProps {
  announcements: Announcement[];
}

const AnnouncementBox = ({ announcements }: AnnouncementBoxProps) => {
  const [showAll, setShowAll] = useState(false);

  if (announcements.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 0, bgcolor: '#111', border: '1px solid #333', textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" fontFamily="monospace">NO_SYSTEM_MESSAGES</Typography>
      </Paper>
    )
  }

  const displayList = showAll ? announcements : announcements.slice(0, 5);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'monospace' }}>
          <WarningIcon color="secondary" />
          SYSTEM_ALERTS
        </Typography>
        <Button onClick={() => setShowAll(!showAll)} sx={{ color: 'secondary.main' }} endIcon={<KeyboardArrowRightIcon />}>
          {showAll ? 'COLLAPSE' : 'EXPAND'}
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 0, overflow: 'hidden', border: '1px solid #333', bgcolor: '#0f0f0f' }}>
        <List disablePadding>
          {displayList.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  py: 2.5,
                  px: 3,
                  '&:hover': { bgcolor: 'rgba(255, 0, 85, 0.05)' },
                  transition: 'background-color 0.2s',
                  borderLeft: index === 0 ? '2px solid' : '2px solid transparent',
                  borderLeftColor: index === 0 ? 'secondary.main' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                  <WarningIcon sx={{ color: index === 0 ? 'secondary.main' : '#555', fontSize: '1.2rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: '#ddd' }}>
                      {item.content.length > 80 ? item.content.slice(0, 80) + '...' : item.content}
                    </Typography>
                  }
                  secondary={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>
                      <AccessTimeIcon sx={{ fontSize: '0.8rem' }} />
                      {new Date(item.created_at).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
                    </Box>
                  }
                />
                {index === 0 && (
                  <Box
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      color: 'secondary.main',
                      border: '1px solid',
                      px: 1,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      ml: 2,
                      fontFamily: 'monospace'
                    }}
                  >
                    URGENT
                  </Box>
                )}
              </ListItem>
              {index < displayList.length - 1 && <Divider component="li" sx={{ borderColor: '#222' }} />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AnnouncementBox;
