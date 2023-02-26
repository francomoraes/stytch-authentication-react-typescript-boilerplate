import { useStytch } from '@stytch/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const stytchClient = useStytch();

    const navigate = useNavigate();

    const logout = useCallback(() => {
        stytchClient.session.revoke().then(() => {
            navigate('/login');
        });
    }, [stytchClient, navigate]);

    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={logout}>Logout</button>;
        </div>
    );
};

export default Homepage;
