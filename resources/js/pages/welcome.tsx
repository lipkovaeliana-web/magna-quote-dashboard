import { Head } from '@inertiajs/react';
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
        <>
            <Head title="Quote Dashboard" />

            <div style={{ padding: '32px', fontFamily: 'Arial' }}>
                <h1>Quote Dashboard</h1>

                <div style={{ display: 'grid', gap: '16px' }}>
                    {users.map((item) => (
                        <div
                            key={item.user.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '12px',
                                padding: '20px',
                            }}
                        >
                            <h2>{item.user.name}</h2>
                            <p>{item.user.email}</p>

                            <p>
                                Poslední přihlášení:{' '}
                                {item.user.last_login_at ?? 'Nikdy'}
                            </p>

                            <p>
                                Je aktivní:{' '}
                                {item.user.is_active ? 'ANO' : 'NE'}
                            </p>

                            <blockquote>"{item.quote.quote}"</blockquote>

                            <p>Autor: {item.quote.author}</p>

                            <small>
                                Poslední fetchnutí: {item.fetched_at}
                            </small>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
