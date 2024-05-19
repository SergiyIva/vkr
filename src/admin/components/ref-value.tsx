import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonCSS } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { ShowPropertyProps, ViewHelpers } from 'adminjs';

const StyledLink = styled<any>(Link)`
  ${ButtonCSS};
  padding-left: ${({ theme }: any) => theme.space.xs};
  padding-right: ${({ theme }: any) => theme.space.xs};
`;

type Props = Pick<ShowPropertyProps, 'property' | 'record'>;

const ReferenceValue: React.FC<Props> = (props) => {
  const { property, record } = props;

  const h = new ViewHelpers();
  const refId = record.params[property.path];
  const populated = record.populated[property.path];
  const value =
    (populated &&
      ((/\D/.test(populated.title) && populated.title) ||
        populated.params.firstName)) ||
    refId;

  if (!property.reference) {
    throw new Error(`property: "${property.path}" does not have a reference`);
  }

  if (populated && populated.recordActions.find((a) => a.name === 'show')) {
    const href = h.recordActionUrl({
      resourceId: property.reference,
      recordId: refId,
      actionName: 'show',
    });
    return (
      <StyledLink variant="text" to={href}>
        {value}
      </StyledLink>
    );
  }
  return <span>{value}</span>;
};

export default ReferenceValue;
