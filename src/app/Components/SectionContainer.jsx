"use client";
import { Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { customStyles } from '@/app/theme';

export function SectionContainer({ title, children, noTitleMotion = false, innerProps = {} }) {
    const titleContent = (
        <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            sx={customStyles.sectionTitle}
        >
            {title}
        </Typography>
    );

    return (
        <Container>
            <Stack
                direction="column"
                spacing={5}
                className="sectionStack"
                sx={{
                    mt: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
                {...innerProps}
            >
                {noTitleMotion ? titleContent : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {titleContent}
                    </motion.div>
                )}

                {children}
            </Stack>
        </Container>
    );
}
