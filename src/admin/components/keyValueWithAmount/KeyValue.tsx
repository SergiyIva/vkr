import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, FormGroup, FormMessage, Icon, Input, Section, SelectAsync } from '@adminjs/design-system';
import {
  ApiClient,
  EditPropertyProps,
  flat,
  ParamsType,
  PropertyJSON,
  PropertyLabel,
  RecordError,
  RecordJSON,
  SelectRecord,
  useTranslation
} from "adminjs";
import { styled } from "@adminjs/design-system/styled-components";
import { unflatten } from "flat";

export type EditKeyValuePairProps = {
  onKeyChange: (key: string, newKey: string) => void
  onValueChange: (key: string, newValue: string) => void
  onRemoveItem: (key: string) => void
  objectValue: {
    amount: string,
  }
  objectKey: string
  property: PropertyJSON
  error?: RecordError
}
type SelectRecordEnhanced = SelectRecord & {
  // record: RecordJSON;
};

const MyForm = styled(FormGroup)`
    label {
        display: none;
    }

    section > div {
        margin-bottom: 0;
    }
`;

const EditKeyValuePair: React.FC<EditKeyValuePairProps> = (props) => {
  const {
    onKeyChange,
    onValueChange,
    onRemoveItem,
    property,
    objectValue,
    objectKey,
    error,
  } = props;
  const { tm } = useTranslation();
  const [amountValue, setAmountValue] = useState(objectValue["amount"] ?? '1');
  const [currentKey, setKey] = useState(objectKey ?? '');
  const [loadingRecord, setLoadingRecord] = useState(0);
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>();

  const loadOptions = async (inputValue: string): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient();

    const optionRecords = await api.searchRecords({
      resourceId: property.reference!,
      query: inputValue,
    });
    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord,
    }));
  };

  const handleChange = (selected: SelectRecordEnhanced) => {
    if (selected) {
      setKey(selected.value.toString());
      onKeyChange(currentKey, selected.value.toString());
    } else {
      setKey("");
      onKeyChange(currentKey, "");
    }
  };

  useEffect(() => {
    if (currentKey && !/\D/.test(currentKey)) {
      setLoadingRecord((c) => c + 1);
      const api = new ApiClient();
      api
        .recordAction({
          actionName: 'show',
          resourceId: property.reference!,
          recordId: currentKey,
        })
        .then(({ data }: any) => {
          setLoadedRecord(data.record);
        })
        .finally(() => {
          setLoadingRecord((c) => c - 1);
        });
    }
  }, [currentKey, property]);

  const selectedValue = loadedRecord;
  const selectedOption = (currentKey && selectedValue) ? {
    value: selectedValue.id,
    label: selectedValue.title,
  } : {
    value: '',
    label: '',
  };

  return (
    <Box flex mb="lg">
      <Box flex justifyContent="space-between" flexGrow={1} flexShrink={0}>
        <MyForm error={Boolean(error)} mr="lg" mb="0px">
          <SelectAsync
            cacheOptions
            value={selectedOption}
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleChange}
            isClearable
            isDisabled={property.isDisabled}
            isLoading={!!loadingRecord}
          />
          {error && <FormMessage>{error.message}</FormMessage>}
        </MyForm>
        <FormGroup mb="0px">
          <Input
            mb="10px"
            placeholder={tm('amount')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountValue(e.target.value)}
            onBlur={() => onValueChange(currentKey, amountValue)}
            onKeyDown={(e: KeyboardEvent) => e.keyCode === 13 && onValueChange(currentKey, amountValue)}
            value={amountValue}
            disabled={!objectKey}
            {...(property.props?.valueInputProps ?? {})}
          />
        </FormGroup>
      </Box>
      <Button
        rounded
        ml="sm"
        data-testid="delete-item"
        type="button"
        size="icon"
        onClick={() => onRemoveItem(currentKey)}
        variant="contained"
        color="danger"
        flexGrow={0}
        flexShrink={1}
      >
        <Icon icon="Trash2" />
      </Button>
    </Box>
  );
};

type ObjectType = Record<string, {
  amount: string
}>

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange, resource } = props;
  const { tm, tb } = useTranslation();
  const selectedValues =
    unflatten<ParamsType, any>(record.params)[property.path] || [];
  const selectedValuesToOptions = selectedValues.map((selectedValue: any) => {
    const params =
      record.populated[`${property.path}.${selectedValue}`]?.params;
    if (!params) return {};
    return {
      [params.aiId]: {
        amount: params.amount,
      }
    };
  }).reduce((acc: any, val: any) => ({ ...acc, ...val }), {});
  const [objectValue, setObjectValue] = useState<ObjectType>(
    selectedValuesToOptions ?? {},
  );

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    if (newKey in objectValue) {
      handleRemoveItem(oldKey);
      return;
    }

    const tmpValue = objectValue[oldKey];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [oldKey]: _removedKey, ...objectCopy } = objectValue;

    objectCopy[newKey] = tmpValue ?? '';
    setObjectValue(parseObjectValue(objectCopy));
  };

  const handleValueChange = (key: string, value: string) => {
    objectValue[key] = {
      ...objectValue[key],
      amount: value
    };

    setObjectValue(parseObjectValue({ ...objectValue }));
  };

  const parseObjectValue = (obj: ObjectType) => Object.entries(obj)
    .reduce((memo, [k, v]) => {
      if (!k || !k.length) return memo;
      memo[k] = v;
      return memo;
    }, {} as {
      [key: string]: {
        amount: string
      }
    });

  /**
   * This is used to prevent empty/duplicate keys from being added to JSON
   */
  const getNextKey = (previousId?: number): string => {
    const nextId = previousId
      ? previousId + 1
      : Object.keys(objectValue ?? {}).length + 1;
    const nextKey = `${tm('initialKey', resource.id, { number: nextId })}`;

    if (objectValue[nextKey] !== undefined) {
      return getNextKey(nextId);
    }

    return nextKey;
  };

  const addNewKeyValuePair = (event: MouseEvent) => {
    event.preventDefault();

    const key = getNextKey();

    objectValue[key] = {
      amount: "1"
    };

    setObjectValue(parseObjectValue({ ...objectValue }));
  };

  const handleRemoveItem = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _removedKey, ...objectCopy } = objectValue;

    setObjectValue(parseObjectValue(objectCopy));
  };

  useEffect(() => {
    onChange(property.path, Object.entries(objectValue).map(([key, value]) => ({
      id: key,
      ...value
    })));
  }, [objectValue]);

  const error = record.errors && record.errors[property.path];
  if (property.description === undefined) {
    property.description = tm('keyValuePropertyDefaultDescription', resource.id);
  }

  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <Section {...property.props}>
        {Object.entries(objectValue).map(([key, value]) => (
          <EditKeyValuePair
            key={key}
            property={property}
            objectValue={value}
            objectKey={key}
            onKeyChange={handleKeyChange}
            onValueChange={handleValueChange}
            onRemoveItem={handleRemoveItem}
            error={record.errors[`${property.path}${flat.DELIMITER}${key}`]}
          />
        ))}
        <Button mt="lg" onClick={addNewKeyValuePair}>
          {tb('addNewItem', resource.id)}
        </Button>
      </Section>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  );
};

export default Edit;
