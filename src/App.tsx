import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CircularProgress, Alert } from "@mui/material";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    body: string;
}

function App() {
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // captura o userId do parent via postMessage
    useEffect(() => {
        window.parent.postMessage({ type: "GET_USER_ID" }, "*");

        const handler = (event: MessageEvent) => {
            if (event.data?.type === "USER_ID") {
                setUserId(event.data.value);
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    // busca APIs
    useEffect(() => {
        if (!userId) return;

        async function fetchData() {
            try {
                setLoading(true);
                const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if (!userRes.ok) throw new Error("Usuário não encontrado");
                const userData = await userRes.json();
                setUser(userData);

                const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const postsData = await postsRes.json();
                setPosts(postsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            {user && (
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography color="text.secondary">{user.email}</Typography>
                    </CardContent>
                </Card>
            )}

            <Typography variant="h6" sx={{ mb: 1 }}>
                Posts
            </Typography>

            {posts.map((post) => (
                <Card key={post.id} sx={{ mb: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle1">{post.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.body}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default App;