"use client";
import { Typography, Stack, Button, Box } from "@mui/material";

export function RelatedItems({ title, itemIds, fullList, basePath }) {
    if (!itemIds || itemIds.length === 0) return null;

    return (
        <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" sx={{ display: "block", mb: 2 }}>
                <strong>{title}:</strong>
            </Typography>
            <Stack
                direction="row"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
                sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            >
                {itemIds.map((id, index) => {
                    const relatedItem = fullList.find(item => item.id === id);
                    if (!relatedItem) return null;
                    return (
                        <Button
                            key={index}
                            variant="contained"
                            color="primary"
                            href={`/${basePath}/${relatedItem.id}`}
                            sx={{ width: "-webkit-fit-content", marginBottom: 2 }}
                        >
                            {relatedItem.title}
                        </Button>
                    );
                })}
            </Stack>
        </Box>
    );
}
