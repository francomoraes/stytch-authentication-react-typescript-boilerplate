import './reset.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { ResetPassword } from './pages/ResetPassword';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { useTheme } from './hooks/themes';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Homepage from './pages/Homepage';
import { useState } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
}

//318. User Profile Update

const App: React.FC = () => {
    const navigate = (path: string) => {
        return <Navigate to={path} />;
    };

    const { theme } = useTheme();

    const [user, setUser] = useState<User | null>(null);

    const loadUser = (data: User) => {
        setUser({
            id: data.id,
            name: data.name,
            email: data.email
        });
    };

    const unloadUser = () => setUser(null);

    return (
        <div className="App">
            <Router>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Routes>
                        {user ? (
                            <>
                                <Route
                                    path="/"
                                    element={navigate('/homepage')}
                                />
                                <Route
                                    path="/homepage"
                                    element={
                                        <Homepage unloadUser={unloadUser} />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={navigate('/login')} />
                                <Route
                                    path="/signup"
                                    element={<SignUp loadUser={loadUser} />}
                                />
                                <Route
                                    path="/login"
                                    element={<Login loadUser={loadUser} />}
                                />
                                <Route
                                    path="/resetpassword/*"
                                    element={<ResetPassword />}
                                />
                            </>
                        )}
                    </Routes>
                </ThemeProvider>
            </Router>
        </div>
    );
};

export default App;
