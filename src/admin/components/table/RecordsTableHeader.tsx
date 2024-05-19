import React, { useEffect, useState } from 'react';
import { CheckBox, TableCell, TableHead, TableRow } from '@adminjs/design-system';
import PropertyHeader from './PropertyHeader.js';
import { RecordJSON, RecordsTableHeaderProps, useQueryParams } from 'adminjs';
import { display } from './utils/tableDisplay.js';
//@ts-ignore
import { getResourceElementCss } from "../../../node_modules/adminjs/src/frontend/utils/data-css-name";
import pickBy from "lodash/pickBy.js";
import { isNil } from "lodash";

const RecordsTableHeader: React.FC<RecordsTableHeaderProps> = (props) => {
  const {
    titleProperty, properties,
    sortBy, direction,
    onSelectAll, selectedAll
  } = props;
  const [filter, setFilter] = useState<Record<string, unknown>>({});
  const { storeParams, filters } = useQueryParams();
  const contentTag = getResourceElementCss(titleProperty.resourceId, 'table-head');

  const rowTag = `${titleProperty.resourceId}-table-head-row`;
  const checkboxCss = `${titleProperty.resourceId}-checkbox-table-cell`;
  const [modal, setModal] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setFilter(filters ? filters : {});
  }, [filters]);
  const toggleModal = (lbl: string) => {
    setModal((prev) => {
      if (prev.hasOwnProperty(lbl)) {
        return {};
      }
      return { [lbl]: true };
    });
  };
  const handleChange = (propertyName: string | RecordJSON, value: any): void => {
    setFilter({
      ...filter,
      [propertyName as string]: typeof value === 'string' && !value.length ? undefined : value,
    });
  };

  const clearFilter = (propertyName: string) => {
    setFilter((filter) => {
      const newState = { ...filter };
      if (propertyName === 'createdAt' || propertyName === 'updatedAt') {
        const from = `${propertyName}~~from`;
        const to = `${propertyName}~~to`;
        delete newState[from];
        delete newState[to];
      } else {
        delete newState[propertyName];
      }
      return newState;
    });
  };
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    storeParams({ filters: pickBy(filter, (v) => !isNil(v)), page: '1' });
  };
  return (
    <TableHead data-css={contentTag}>
      <TableRow data-css={rowTag}>
        <TableCell data-css={checkboxCss}>
          {onSelectAll ? (
            <CheckBox
              style={{ marginLeft: 5 }}
              onChange={() => onSelectAll()}
              checked={selectedAll}
            />
          ) : null}
        </TableCell>
        {properties.map((property) => (
          <PropertyHeader
            display={display(property.isTitle)}
            key={property.propertyPath}
            titleProperty={titleProperty}
            property={property}
            sortBy={sortBy}
            direction={direction}
            modal={modal}
            filter={filter}
            toggleModal={toggleModal}
            handleChange={handleChange}
            clearFilter={clearFilter}
            handleSubmit={handleSubmit}
          />
        ))}
        <TableCell key="actions" style={{ width: 80 }} />
      </TableRow>
    </TableHead>
  );
};

export default RecordsTableHeader;
