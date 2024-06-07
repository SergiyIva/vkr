import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '@adminjs/design-system';
import { PropertyJSON, ViewHelpers } from 'adminjs';

interface Props {
  property: PropertyJSON;
  record: any;
}

const StyledLink = styled<any>(Link)`
    padding-left: 6px;
    padding-right: 6px;
`;

const ReferenceValue: React.FC<Props> = (props) => {
  const { property, record } = props;

  const h = new ViewHelpers();
  const refId = record.id;

  const href = h.recordActionUrl({
    resourceId: property.reference as string,
    recordId: refId,
    actionName: 'show',
  });
  return (
    <StyledLink to={href}>
      <Button size="sm" rounded>
        {record.name}
      </Button>
    </StyledLink>
  );
};

export default ReferenceValue;
