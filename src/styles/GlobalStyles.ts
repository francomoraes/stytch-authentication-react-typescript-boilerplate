import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root, .App {
        height: 100%;
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Noto Sans', sans-serif;
    }

    button {
        cursor: pointer;
    }
`;
