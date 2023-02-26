import styled from 'styled-components';
import { loginBackground } from '../assets/loginBackground';

export const Container = styled.div`
    background-color: ${(props) => props.theme.color.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
`;

export const CustomBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.color.primary};
    height: 60%;
    width: 30%;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

export const ImageDiv = styled.div`
    background: url(${loginBackground});
    background-size: auto 150%;
    background-repeat: no-repeat;
    background-position: center;
    width: calc(100% - 100px);
    height: 30%;
    margin-top: 40px;
    border-radius: 12px 12px 0 0;
`;

export const CustomInput = styled.input`
    width: calc(100% - 100px);
    height: 50px;
    padding: 0 10px;
    color: ${(props) => props.theme.color.white};
    background-color: transparent;
    border-bottom: 1px solid ${(props) => props.theme.color.white};
    ::placeholder {
        color: ${(props) => props.theme.color.gray};
    }
`;

export const CustomButton = styled.button`
    width: calc(100% - 100px);
    height: 40px;
    background-color: ${(props) => props.theme.color.secondary};
    border-radius: 20px;
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    :hover {
        background-color: ${(props) => props.theme.color.tertiary};
        color: ${(props) => props.theme.color.gray};
        scale: 1.05;
    }
    :active {
        scale: 0.95;
    }
`;

export const CustomLink = styled.a`
    background-color: transparent;
    text-decoration: none;
    color: ${(props) => props.theme.color.gray};
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    :hover {
        color: ${(props) => props.theme.color.white};
        scale: 1.05;
    }
    :active {
        scale: 0.95;
    }
    font-family: 'Roboto', sans-serif;
    margin-bottom: 30px;
`;

export const ToggleContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`;
