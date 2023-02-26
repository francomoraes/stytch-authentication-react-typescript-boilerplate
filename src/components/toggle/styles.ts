import styled from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';

export const Container = styled.div`
    display: flex;
    align-items: center;
`;
export const ToggleLabel = styled.span`
    color: ${(props) => props.theme.color.white};
    font-family: 'Noto', sans-serif;
`;

export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
    ({ theme }) => ({
        onColor: theme.color.primary,
        offColor: theme.color.tertiary
    })
)<ReactSwitchProps>`
    margin: 0 7px;
`;
