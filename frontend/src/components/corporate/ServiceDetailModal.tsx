import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface ServiceDetail {
    title: string;
    description: string;
    longDescription: string; // More detailed description
    items: string[];
    imageColor: string; // Placeholder for image (color)
}

interface ServiceDetailModalProps {
    open: boolean;
    onClose: () => void;
    service: ServiceDetail | null;
}

const ServiceDetailModal = ({ open, onClose, service }: ServiceDetailModalProps) => {
    if (!service) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div" fontWeight="bold" color="primary">
                    {service.title} Service
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Visual Header / Placeholder Image */}
            <Box
                sx={{
                    height: 200,
                    bgcolor: service.imageColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h3" fontWeight={800} sx={{ opacity: 0.2 }}>{service.title}</Typography>
            </Box>

            <DialogContent dividers sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    {service.description}
                </Typography>

                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                    {service.longDescription}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Key Features
                </Typography>
                <List>
                    {service.items.map((item, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <CheckCircleOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={item}
                                primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceDetailModal;
