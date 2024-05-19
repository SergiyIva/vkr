// import { RecordJSON, PropertyJSON } from '../../../interfaces';
// import { flat } from '../../../../utils';
// import { convertToSubProperty } from './convert-to-sub-property';
import { ParamsType, PropertyJSON, RecordJSON, useTranslation } from 'adminjs';
import React, { useEffect } from 'react';
import { unflatten } from 'flat';

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
};

const ManyToManyList = (props: Props) => {
  const { property, record, ItemComponent } = props;
  const { translateProperty } = useTranslation();
  const DELIMITER = '.';

  const getSubpropertyPath = (path: string, index: number) =>
    [path, index].join(DELIMITER);

  const convertToSubProperty = (
    arrayProperty: PropertyJSON,
    index: number,
  ): PropertyJSON => ({
    ...arrayProperty,
    path: getSubpropertyPath(arrayProperty.path, index),
    label: `[${index + 1}]`,
    isArray: false,
    isDraggable: false,
  });

  const items = unflatten<ParamsType, any>(record.params)[property.path] || [];

  useEffect(() => {
    console.log(record);
  });

  return <>{`${translateProperty('length')}: ${items.length}`}</>;
};
export default ManyToManyList;
