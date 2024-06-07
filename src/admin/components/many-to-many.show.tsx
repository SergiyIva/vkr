import { ValueGroup } from '@adminjs/design-system';
import { ParamsType, PropertyJSON, RecordJSON, useTranslation } from 'adminjs';
import React from 'react';
import ReferenceValue from './reference-value.js';
import { unflatten } from 'flat';

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
};

const ManyToManyShow = (props: Props) => {
  const { property, record, ItemComponent } = props;
  const { translateProperty } = useTranslation();

  const items = unflatten<ParamsType, any>(record.params)[property.path] || [];

  return (
    <>
      <ValueGroup label={translateProperty(property.label)}>
        {items
          .map((selectedValue: any) => {
            const params =
              record.populated[`${property.path}.${selectedValue}`]?.params;
            return {
              id: selectedValue,
              name: params?.name || params?.firstName || params?.id,
            };
          })
          .map((item: any, i: number) => {
            return (
              <ReferenceValue
                key={i}
                {...props}
                record={item}
                property={property}
              />
            );
          })}
      </ValueGroup>
    </>
  );
};

export default ManyToManyShow;
