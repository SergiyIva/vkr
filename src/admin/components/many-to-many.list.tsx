import { ParamsType, PropertyJSON, RecordJSON, useTranslation } from 'adminjs';
import React from 'react';
import { unflatten } from 'flat';

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
};

const ManyToManyList = (props: Props) => {
  const { property, record } = props;
  const { translateProperty } = useTranslation();

  const items = unflatten<ParamsType, any>(record.params)[property.path] || [];

  return <>{`${translateProperty('length')}: ${items.length}`}</>;
};
export default ManyToManyList;
