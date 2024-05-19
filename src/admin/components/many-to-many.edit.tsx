import React, { FC, useEffect, useState } from 'react';
import {
  FormGroup,
  FormMessage,
  Label,
  SelectAsync,
} from '@adminjs/design-system';
import {
  ApiClient,
  EditPropertyPropsInArray,
  ParamsType,
  RecordJSON,
  SelectRecord,
  useTranslation,
} from 'adminjs';
import { unflatten } from 'flat';

type CombinedProps = EditPropertyPropsInArray;
type SelectRecordEnhanced = SelectRecord & {
  // record: RecordJSON;
};

const EditManyToManyInput: FC<CombinedProps> = (props) => {
  const { onChange, property, record } = props;
  const { reference: resourceId } = property;
  const { translateProperty } = useTranslation();

  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`);
  }

  const handleChange = (selected: any[]): void => {
    setSelectedOptions(selected);
    if (selected) {
      onChange(
        property.path,
        selected.map((option) => ({ id: option.value })),
      );
    } else {
      onChange(property.path, null);
    }
  };

  const loadOptions = async (
    inputValue: string,
  ): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient();

    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue,
    });

    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: /\D/.test(optionRecord.title)
        ? optionRecord.title
        : optionRecord.params.firstName ||
          optionRecord.params.name ||
          optionRecord.title,
    }));
  };
  const error = record?.errors[property.path];

  const selectedValues =
    unflatten<ParamsType, any>(record.params)[property.path] || [];

  const selectedId = record?.params[property.path] as string | undefined;
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>();
  const [loadingRecord, setLoadingRecord] = useState(0);
  const selectedValue = record?.populated[property.path] ?? loadedRecord;
  const selectedValuesToOptions = selectedValues.map((selectedValue: any) => {
    const params =
      record.populated[`${property.path}.${selectedValue}`]?.params;
    return {
      value: selectedValue,
      label: params?.name || params?.firstName || params?.id,
    };
  });
  const [selectedOptions, setSelectedOptions] = useState(
    selectedValuesToOptions,
  );

  useEffect(() => {
    if (!selectedValue && selectedId) {
      setLoadingRecord((c) => c + 1);
      const api = new ApiClient();
      api
        .recordAction({
          actionName: 'show',
          resourceId,
          recordId: selectedId,
        })
        .then(({ data }: any) => {
          setLoadedRecord(data.record);
        })
        .finally(() => {
          setLoadingRecord((c) => c - 1);
        });
    }
  }, [selectedValue, selectedId, resourceId]);

  return (
    <FormGroup error={Boolean(error)}>
      <Label>{translateProperty(property.label)}</Label>
      <SelectAsync
        //@ts-ignore
        isMulti={true}
        cacheOptions
        value={selectedOptions}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isLoading={!!loadingRecord}
        {...property.props}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  );
};

export default EditManyToManyInput;
