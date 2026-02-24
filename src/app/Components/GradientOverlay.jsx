"use client";
import * as React from "react";
import { Box } from "@mui/material";

export default function GradientOverlay() {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.8) 100%)',
            }}
        />
    );
}