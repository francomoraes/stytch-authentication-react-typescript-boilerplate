import { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './hooks/themes';
import { StytchHeadlessClient } from '@stytch/vanilla-js/headless';
import { StytchProvider } from '@stytch/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const RenderComponent = () => {
    const stytchClient = useMemo(
        () =>
            new StytchHeadlessClient(
                'public-token-test-c59f5844-6e35-4434-8ca8-cd9df643e2e7'
            ),
        []
    );

    return (
        <ThemeProvider>
            <StytchProvider stytch={stytchClient}>
                <App />
            </StytchProvider>
        </ThemeProvider>
    );
};

root.render(<RenderComponent />);
