import "expo-router/entry";
import { createServer, Server } from "miragejs";

declare global {
    interface Window {
        server: Server;
    }
}

if (__DEV__) {
    if(window.server) {
        window.server.shutdown();
    }

    window.server = createServer({
        routes() {
            this.post("login", (schema, request) => {
                const { email, password } = JSON.parse(request.requestBody);
                if (email === "test@test.com" && password === "test") {
                    return {
                        accessToken: "access-token",
                        refreshToken: "refresh-token",
                        user: {
                            id: "yhc",
                            name: "yhc",
                            description: "hello world",
                            profileImage: "https://picsum.photos/200/300",
                        }
                    };
                }
                return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
            });
        },
    });
}