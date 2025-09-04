import { Card, CardContent, Typography } from "@mui/material";
import type { User } from "../types";

interface Props {
    user: User;
}

export default function UserInfo({ user }: Props) {
    return (
        <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#31007f" }}>
                    {user.name}
                </Typography>
                <Typography color="text.secondary">{user.email}</Typography>
            </CardContent>
        </Card>
    );
}