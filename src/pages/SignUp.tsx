import { useState } from 'react';
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
import { User } from '../App';

interface Props {
    loadUser: (data: User) => void;
}

export const SignUp: React.FC<Props> = ({ loadUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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

    const signUp = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    loadUser(user);
                    navigate('/homepage');
                } else {
                    setModalMessage('Unable to register');
                    setShowModal(true);
                }
            })
            .catch((err) => {
                setModalMessage('Unable to get response from server');
                setShowModal(true);
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
                    placeholder="Enter your name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
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
