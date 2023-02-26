import './reset.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { useStytchUser } from '@stytch/react';
import { ResetPassword } from './pages/ResetPassword';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { useTheme } from './hooks/themes';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Homepage from './pages/Homepage';

const App: React.FC = () => {
    const navigate = (path: string) => {
        return <Navigate to={path} />;
    };

    const { theme } = useTheme();

    const { user } = useStytchUser();

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
                                    element={<Homepage />}
                                />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={navigate('/login')} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
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
