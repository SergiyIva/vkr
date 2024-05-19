import { keyframes, styled } from 'styled-components';
import { Placement } from '@popperjs/core';

const opacityOn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;
export const Wrapper = styled.div`
    display: inherit;
    position: relative;
`;

type TooltipProps = {
  $direction: Placement;
  $widthInRem?: number;
};
export const Tooltip = styled.div<TooltipProps>`
    font-size: 1rem;
    z-index: 10;
    position: absolute;
    display: block;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background-color: #ccc;
    background-clip: padding-box;
    box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.25);
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    line-height: 1.2;
    opacity: 1;
    width: auto;
    min-width: 10rem;
    max-width: ${({ $widthInRem }: any) => ($widthInRem ? $widthInRem : 6)}rem;
    animation: ${opacityOn} 0.15s ease-in-out;
`;

export const Arrow = styled('div')`
    position: absolute;
    z-index: 2;
    width: 1em;
    height: 1em;

    &[data-placement*='bottom'] {
        top: 0;
        left: 0;
        margin-top: -0.9em;
        height: 1em;
        width: 1em;

        &::before {
            border-width: 0 0.5em 0.5em 0.5em;
            border-color: transparent transparent #ccc transparent;
        }
    }

    &[data-placement*='top'] {
        bottom: 0;
        left: 0;
        margin-bottom: -0.9em;
        height: 1em;
        width: 1em;

        &::before {
            border-width: 0.5em 0.5em 0 0.5em;
            border-color: #ccc transparent transparent transparent;
        }
    }

    &[data-placement*='right'] {
        left: 0;
        margin-left: -0.9em;
        height: 1em;
        width: 1em;

        &::before {
            border-width: 0.5em 0.5em 0.5em 0;
            border-color: transparent #ccc transparent transparent;
        }
    }

    &[data-placement*='left'] {
        right: 0;
        margin-right: -0.9em;
        height: 1em;
        width: 1em;

        &::before {
            border-width: 0.5em 0 0.5em 0.5em;
            border-color: transparent transparent transparent #ccc;
        }
    }

    &::before {
        content: '';
        margin: auto;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
    }
`;

export const Heading = styled.h5`
    margin: 0;
    color: #222;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
`;

export const Paragraph = styled.p`
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0;
    margin-top: 0.25rem;
    color: #222;
`;
