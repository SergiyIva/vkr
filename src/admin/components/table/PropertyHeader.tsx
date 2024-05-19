import React, { MutableRefObject, useMemo, useRef } from 'react';
import {
  BasePropertyComponent,
  PropertyHeaderProps,
  RecordJSON,
  SortLink,
  useQueryParams,
  useResource,
  useTranslation
} from 'adminjs';
import { TableCell } from '@adminjs/design-system';
import * as S from './styles.js';
import { useClickOutside } from "../../hooks/useClickOutside.js";

type Props = PropertyHeaderProps & {
  modal: { [key: string]: boolean }
  toggleModal: (value: string) => void
  filter: Record<string, any>
  handleChange: (propertyName: string | RecordJSON, value: any) => void
  clearFilter: (propertyName: string) => void
  handleSubmit: (event: React.MouseEvent) => void
}

const PropertyHeader = (props: Props) => {
  const {
    handleSubmit,
    filter,
    clearFilter,
    handleChange,
    property,
    titleProperty,
    display,
    modal,
    toggleModal
  } = props;
  const { translateProperty } = useTranslation();
  const isMain = property.propertyPath === titleProperty.propertyPath;
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const resource = useResource(property.resourceId);

  useClickOutside(() => {
    if (modal[property.name])
      toggleModal(property.name);
  }, ref);
  const { listParams } = useQueryParams();

  const isActive = useMemo(() => {
    const filterName = (property.name !== 'createdAt' && property.name !== 'updatedAt') ? property.name : `${property.name}~~from`;
    return !!listParams?.filters?.[filterName];
  }, [listParams, property.name]);

  return (
    <TableCell
      className={isMain ? "main" : undefined}
      display={display}
    >
      <S.Wrapper>
        {property.isSortable ? <SortLink {...props} />
          : translateProperty(property.name, property.resourceId)}
        <S.ModalWrapper ref={ref}>
          <S.SearchIcon isActive={isActive} icon="Search"
                        onClick={() => toggleModal(property.name)} size={12} />
          {
            modal[property.name] && (
              <S.ModalContent>
                {
                  resource && (
                    <BasePropertyComponent
                      key={property.propertyPath}
                      where="filter"
                      onChange={(propertyOrRecord, value) => handleChange(propertyOrRecord, value)}
                      property={property}
                      filter={filter}
                      resource={resource}
                    />
                  )
                }
                <S.BtnBox>
                  <S.SearchBtn onClick={handleSubmit} icon="Search" color="white" />
                  <S.DeleteBtn onClick={() => clearFilter(property.name)} icon="Delete" color="gray" />
                </S.BtnBox>
              </S.ModalContent>
            )
          }
        </S.ModalWrapper>
      </S.Wrapper>
    </TableCell>

  );
};

export default PropertyHeader;
