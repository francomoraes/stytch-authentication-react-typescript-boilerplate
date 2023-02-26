import { useState, useCallback } from 'react';
import { useStytch } from '@stytch/react';

import {
    Container,
    CustomBox,
    CustomButton,
    CustomInput,
    CustomLink,
    ImageDiv,
    Modal,
    ModalButton,
    ModalText,
    Overlay,
    ToggleContainer
} from './styles';
import Toggle from '../components/toggle';
import { useTheme } from '../hooks/themes';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toggleTheme, theme } = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();

    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === 'dark' ? true : false
    );

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    const stytchClient = useStytch();

    const resetPasswordByEmail = useCallback(() => {
        stytchClient.passwords.resetByEmailStart({
            email: email
        });
    }, [stytchClient, email]);

    const login = () => {
        stytchClient.passwords
            .authenticate({
                email,
                password,
                session_duration_minutes: 60
            })
            .then((response) => {
                console.log('response: ', response);
                if (response?.status_code === 200) {
                    navigate('/homepage');
                }
            })
            .catch(() => {
                setShowModal(true);
                setModalMessage('Invalid email or password');
            });
    };

    return (
        <Container>
            {showModal && (
                <Overlay onClick={() => setShowModal(false)}>
                    <Modal>
                        <ModalText>{modalMessage}</ModalText>
                        <ModalButton onClick={() => setShowModal(false)}>
                            X
                        </ModalButton>
                    </Modal>
                </Overlay>
            )}
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
                    placeholder="Enter your email"
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

                <CustomButton onClick={login}>Login</CustomButton>
                <CustomButton onClick={resetPasswordByEmail}>
                    Reset your password
                </CustomButton>
                <CustomLink href={'/signup'}>
                    Don't have an account? Sign Up
                </CustomLink>
            </CustomBox>
        </Container>
    );
};
