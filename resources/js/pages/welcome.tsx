
import { useEffect, useState } from 'react';

export default function Welcome() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/dashboard-users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('API error:', error));
    }, []);

    return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8" }}>
        <header style={{
            height: "56px",
            background: "white",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            fontSize: "18px",
            fontWeight: 600,
        }}>
            {/* Fetch dashboard data from Laravel API */}
            Dashboard
        </header>

        <main style={{
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px",
        }}>
            {/* Render user cards */}
            {users.map((item) => (
                <div key={item.user.id} style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    minHeight: "300px",
                }}>
                    <h2 style={{ margin: 0, fontSize: "22px" }}>
                        {item.user.name}
                    </h2>

                    <p style={{ color: "#6b7280", marginTop: "6px" }}>
                        {item.user.email}
                    </p>

                    <div style={{ marginTop: "24px" }}>
                        <p>
                            Poslední přihlášení:
                            <span style={{ float: "right" }}>
                               {item.user.last_login_at
                                    ? new Date(item.user.last_login_at).toLocaleDateString('cs-CZ')
                                    : "Nikdy"}
                            </span>
                        </p>

                        <p>
                            Je aktivní:
                            <span style={{
                                float: "right",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                background: item.user.is_active ? "#dcfce7" : "#fee2e2",
                                color: item.user.is_active ? "#15803d" : "#dc2626",
                                fontWeight: 700,
                                fontSize: "14px",
                            }}>
                                {item.user.is_active ? "ANO" : "NE"}
                            </span>
                        </p>
                    </div>

                    <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

                    <blockquote style={{
                        margin: 0,
                        fontStyle: "italic",
                        color: "#374151",
                        lineHeight: 1.5,
                    }}>
                        "{item.quote.quote}"
                    </blockquote>

                    <p style={{
                        textAlign: "right",
                        color: "#6b7280",
                        fontWeight: 600,
                    }}>
                        — {item.quote.author}
                    </p>

                    {/* Display API errors without crashing UI */}
                    {item.quote.error && (
                        <p style={{ color: "#dc2626", fontWeight: 600 }}>
                            Error: {item.quote.error}
                        </p>
                    )}

                    <p style={{ marginTop: "24px", color: "#9ca3af", fontSize: "14px" }}>
                        Poslední fetchnutí: {item.quote.fetchedAt ?? item.fetched_at}
                    </p>
                </div>
            ))}
        </main>
    </div>
);
}
