import { useCallback, useState } from 'react';
import { useStytch } from '@stytch/react';
import { useTheme } from '../hooks/themes';
import {
    Container,
    CustomBox,
    CustomButton,
    CustomInput,
    CustomLink,
    ImageDiv,
    ToggleContainer
} from './styles';
import Toggle from '../components/toggle';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark' ? true : false
    );

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    const stytchClient = useStytch();

    const signUp = () => {
        stytchClient.passwords
            .strengthCheck({ email, password })
            .then((res) => {
                console.log('Success: ', res);
            })
            .catch((err) => {
                console.log('Err: ', err);
            });
        stytchClient.passwords.create({
            email,
            password,
            session_duration_minutes: 60
        });
    };

    const logout = useCallback(() => {
        stytchClient.session.revoke();
    }, [stytchClient]);

    return (
        <Container>
            <ToggleContainer>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ToggleContainer>
            <CustomBox>
                <ImageDiv />
                <CustomInput
                    placeholder="mail@mail.com"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <CustomInput
                    type={'password'}
                    placeholder="Enter your password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <CustomButton onClick={signUp}> Login</CustomButton>
                <CustomLink href={'/login'}>
                    Already have an account? Login
                </CustomLink>
                <button onClick={logout}>Logout</button>
            </CustomBox>
        </Container>
    );
};
