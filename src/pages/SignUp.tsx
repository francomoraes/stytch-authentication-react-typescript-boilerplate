import { useState } from 'react';
import { useStytch } from '@stytch/react';
import { useTheme } from '../hooks/themes';
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
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toggleTheme, theme } = useTheme();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
            .then((response) => {
                console.log('response: ', response);
                if (response?.valid_password === true) {
                    navigate('/homepage');
                }
                if (response?.valid_password === false) {
                    setShowModal(true);
                    setModalMessage(
                        response?.feedback.warning +
                            ' ' +
                            response?.feedback.suggestions.map(
                                (suggestion) => suggestion
                            )
                    );
                }
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
                <CustomButton onClick={signUp}> Sign Up</CustomButton>
                <CustomLink href={'/login'}>
                    Already have an account? Login
                </CustomLink>
            </CustomBox>
        </Container>
    );
};
