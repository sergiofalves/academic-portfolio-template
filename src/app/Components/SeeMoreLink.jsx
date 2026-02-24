"use client";
import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { customStyles } from '@/app/theme';

export function SeeMoreLink({ href, text }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Link href={href} passHref style={{ textDecoration: 'none' }}>
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={customStyles.seeMoreLink}
                >
                    <Typography sx={{ fontWeight: 600 }}>
                        {text}
                    </Typography>
                    <ArrowForwardIcon
                        aria-hidden="true"
                        className="arrow-icon"
                        sx={{
                            fontSize: '1.25rem',
                            transition: 'transform 0.2s ease',
                        }}
                    />
                </Stack>
            </Link>
        </motion.div>
    );
}
