"use client";
import { Box, Modal, Backdrop, Fade, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function ImageModal({ open, onClose, imageUrl, altText }) {
    return (
        <Modal
            aria-labelledby="full-screen-image-modal"
            aria-describedby="full-screen-image-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        outline: 'none',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'transparent',
                        borderRadius: 2,
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '70vw',
                        maxHeight: '70vh',
                    }}
                >
                    <IconButton
                        aria-label="close"
                        size="large"
                        autoFocus
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white',
                            zIndex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={altText}
                            style={{
                                maxWidth: 'inherit',
                                maxHeight: 'inherit'
                            }}
                        />
                    )}
                </Box>
            </Fade>
        </Modal>
    );
}
