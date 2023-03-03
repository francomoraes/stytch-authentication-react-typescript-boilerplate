import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    unloadUser: () => void;
}

const Homepage: React.FC<Props> = ({ unloadUser }) => {
    const navigate = useNavigate();

    const logout = useCallback(() => {
        unloadUser();
        navigate('/login');
    }, [unloadUser, navigate]);

    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={logout}>Logout</button>;
        </div>
    );
};

export default Homepage;
