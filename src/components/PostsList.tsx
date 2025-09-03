import { Card, CardContent, Typography } from "@mui/material";
import { Post } from "../types";

interface Props {
    posts: Post[];
}

export default function PostsList({ posts }: Props) {
    return (
        <>
            <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: "bold", color: "#6f00ff" }}>
                Posts
            </Typography>
            {posts.map((post) => (
                <Card key={post.id} sx={{ mb: 1, boxShadow: 1, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.body}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}