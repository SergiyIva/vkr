import { styled } from 'styled-components';
import { Icon } from '@adminjs/design-system';

export const SearchBtn = styled(Icon)`
    background-color: rgb(37, 107, 238);
    padding-top: 5px;
    width: 45%;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.1s ease-in;

    &:hover {
        background-color: rgb(14, 73, 184);
    }
`;

export const DeleteBtn = styled(Icon)`
    padding: 3px 0;
    background-color: rgb(26, 26, 30);
    text-align: center;
    width: 45%;
    border: 1px solid rgba(128, 128, 128, 0.3);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.1s ease-in;

    &:hover {
        background-color: transparent;
    }
`;

export const SearchIcon = styled(Icon)`
    margin: 0 5px;
    cursor: pointer;
    padding: 8px 5px;
    border-radius: 5px;
    background-color: ${({ isActive }) =>
            isActive ? "rgba(128, 128, 128, 0.3)" : "none"};
    transition: background-color 0.1s ease-in;

    &:hover {
        background-color: rgba(128, 128, 128, 0.3);
    }
`;

export const Wrapper = styled('div')`
    display: flex;
    align-items: center;

    > a > span > svg {
        stroke: white;
    }

`;

export const ModalWrapper = styled('div')`
    position: relative;
`;
export const ModalContent = styled('div')`
    .react-datepicker__aria-live {
        display: none !important;
    }

    position: absolute;
    background-color: rgb(21, 20, 25);
    top: 120%;
    left: -20%;
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    z-index: 999;

    > input {
        background-color: rgb(26, 26, 30);
    }
`;
export const BtnBox = styled('div')`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;
