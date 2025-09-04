import { useEffect, useState } from "react";
import { Container, CircularProgress, Alert, Paper, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { User, Post } from "./types";
import UserInfo from "./components/UserInfo";
import PostsList from "./components/PostsList";

export default function App() {
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // OBS:  captura userId do parent via postMessage para poder lidarmos com domínios diferente
    useEffect(() => {
        window.parent.postMessage({ type: "GET_USER_ID" }, "*");

        const handler = (event: MessageEvent) => {
            if (event.data?.type === "USER_ID") {
                setUserId(event.data.value);
            } else {
                // fallback adicionado para testar na porta 5173 do Vite quando ainda não temos o site que será implementado o widget
                setUserId(2);
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if (!userRes.ok) throw new Error("Usuário não encontrado");
                setUser(await userRes.json());

                const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                setPosts(await postsRes.json());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );

    if (error)
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );

    return (
        <Paper
            sx={{
                position: "relative",
                p: 2,
                maxWidth: 320,
                height: "100%",
                overflowY: "auto",
                borderRadius: 3,
                boxShadow: 5,
                backgroundColor: "#f9f9ff",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <IconButton
                    size="small"
                    onClick={() => {
                        window.parent.postMessage({ type: "CLOSE_WIDGET" }, "*");
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {user && <UserInfo user={user} />}
            {posts.length > 0 && <PostsList posts={posts} />}
        </Paper>
    );
}