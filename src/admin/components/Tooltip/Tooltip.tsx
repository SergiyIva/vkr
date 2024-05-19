import * as S from './styles.js';
import React, { MutableRefObject, PropsWithChildren, ReactElement, useRef, useState, } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { useToggle } from '../../hooks/useToggle.js';
import { useTimeout } from '../../hooks/useTimeout.js';

type PopoverProps = {
  tooltip?: string | ReactElement;
  title: string;
  widthInRem?: number;
  direction?: Placement;
};

const Tooltip = ({
                   title,
                   tooltip,
                   widthInRem,
                   children,
                   direction = 'auto',
                 }: PropsWithChildren<PopoverProps>) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [referenceElement, setReferenceElement] = useState<null | HTMLElement>(
    null,
  );
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
  const [arrowElement, setArrowElement] = useState<null | HTMLElement>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: direction,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'preventOverflow',
        enabled: false,
      },
      {
        name: 'hide',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
  });
  const [entered, setEntered] = useToggle();
  // useClickOutside(setEntered(false), ref);
  const [setTimer, clearTimer] = useTimeout(setEntered(true), 300);

  return (
    <div ref={ref}>
      <S.Wrapper
        onMouseEnter={setTimer}
        onMouseLeave={
          () => {
            clearTimer();
            if (entered) {
              setEntered(false)();
            }
          }
        }
        ref={setReferenceElement}
      >
        {children}
        {entered && (
          <S.Tooltip
            $widthInRem={widthInRem}
            ref={setPopperElement}
            style={styles.popper}
            $direction={direction}
            {...attributes.popper}
            role={'tooltip'}
          >
            <S.Arrow
              ref={setArrowElement}
              style={styles.arrow}
              data-placement={direction}
            />
            <S.Heading>{title}</S.Heading>
            {tooltip && <S.Paragraph>{tooltip}</S.Paragraph>}
          </S.Tooltip>
        )}
      </S.Wrapper>
    </div>
  );
};
export default Tooltip;