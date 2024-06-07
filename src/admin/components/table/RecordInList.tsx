// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ButtonGroup, CheckBox, Placeholder, TableCell, TableRow } from '@adminjs/design-system';
import {
  ActionJSON,
  ActionResponse,
  BasePropertyComponent,
  DifferentActionParams,
  ModalFunctions,
  RecordActionResponse,
  RecordJSON,
  ResourceJSON,
  TranslateFunctions,
  useActionResponseHandler,
  useModal,
  useTranslation
} from "adminjs";
import { getResourceElementCss } from "../../../../node_modules/adminjs/src/frontend/utils/data-css-name";
import {
  buildActionClickHandler
} from "../../../../node_modules/adminjs/src/frontend/interfaces/action/build-action-click-handler";
import { actionHref } from "../../../../node_modules/adminjs/src/frontend/interfaces/action/action-href";
import {
  buildActionTestId
} from "../../../../node_modules/adminjs/src/frontend/interfaces/action/build-action-test-id";
import { display } from './utils/tableDisplay.js';

export type RecordInListProps = {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (action: ActionResponse) => any;
  isLoading?: boolean;
  onSelect?: (record: RecordJSON) => void;
  isSelected?: boolean;
}

export type actionsToButtonGroupOptions = {
  actions: Array<ActionJSON>;
  params: DifferentActionParams;
  handleClick: any;
  translateFunctions: TranslateFunctions;
  modalFunctions: ModalFunctions,
}

export const actionsToButtonGroup = (
  options: actionsToButtonGroupOptions,
): any => {
  const { actions, params, handleClick, translateFunctions } = options;
  const { translateAction } = translateFunctions;
  const { resourceId } = params;
  const buttons = actions.map((action) => {
    const href = actionHref(action, params);
    return {
      icon: action.icon,
      label: translateAction(action.label, resourceId),
      variant: action.variant,
      source: action,
      href: href || undefined,
      // when href is not defined - handle click should also be not defined
      // This prevents from "cursor: pointer;"
      onClick: href ? handleClick : undefined,
      'data-testid': buildActionTestId(action),
      buttons: [],
      'data-css': `${action.resourceId}-${action.name}-button`,
    };
  });

  // nesting buttons
  const buttonsMap = buttons.reduce((memo, button) => {
    const action = button.source;
    if (action.parent) {
      const parent: any = memo[action.parent]
        || buttons.find((btn) => btn.source.name === action.parent)
        || { label: action.parent };

      parent.buttons = parent.buttons || [];
      parent.buttons.push(button);
      return {
        ...memo,
        [action.parent]: parent,
      };
    }
    return {
      ...memo,
      [button.source.name]: button,
    };
  }, {} as Record<string, any>);
  return Object.values(buttonsMap);
};

const mergeRecordResponse = (record: RecordJSON, response: RecordActionResponse): RecordJSON => ({
  ...(response.record || record),
  errors: response.record.errors,
  populated: { ...record.populated, ...response.record.populated },
  params: { ...record.params, ...response.record.params },
});

const RecordInList: React.FC<RecordInListProps> = (props) => {
  const {
    resource, record: recordFromProps, actionPerformed,
    isLoading, onSelect, isSelected,
  } = props;
  const [record, setRecord] = useState<RecordJSON>(recordFromProps);
  const navigate = useNavigate();
  const location = useLocation();
  const translateFunctions = useTranslation();
  const modalFunctions = useModal();

  const handleActionCallback = useCallback((actionResponse: ActionResponse) => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord(mergeRecordResponse(record, actionResponse as RecordActionResponse));
    } else if (actionPerformed) {
      actionPerformed(actionResponse);
    }
  }, [actionPerformed, record]);

  const actionResponseHandler = useActionResponseHandler(handleActionCallback);

  useEffect(() => {
    setRecord(recordFromProps);
  }, [recordFromProps]);

  const { recordActions } = record;

  const show = record.recordActions.find(({ name }) => name === 'show');
  const edit = record.recordActions.find(({ name }) => name === 'edit');
  const action = edit || show;

  const handleClick = (event: React.MouseEvent): void => {
    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (action
      && targetTagName !== 'a'
      && targetTagName !== 'button'
      && targetTagName !== 'svg'
    ) {
      buildActionClickHandler({
        action,
        params: { resourceId: resource.id, recordId: record.id },
        actionResponseHandler,
        navigate,
        location,
        translateFunctions,
        modalFunctions,
      })(event);
    }
  };

  const handleWheelClick = (event: React.MouseEvent) => {
    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (event.button !== 1 || targetTagName === "svg" || targetTagName === "button" || targetTagName === "a") return;

    window.open(`${window.location.origin}${location.pathname}/records/${record.id}/edit`, '');
  };

  const actionParams = { resourceId: resource.id, recordId: record.id };

  const handleActionClick = (event: React.MouseEvent, sourceAction: ActionJSON): void | Promise<void> => (
    buildActionClickHandler({
      action: sourceAction,
      params: actionParams,
      actionResponseHandler,
      navigate,
      location,
      translateFunctions,
      modalFunctions,
    })(event)
  );

  const buttons = [{
    icon: 'MoreHorizontal',
    variant: 'light' as const,
    label: undefined,
    'data-testid': 'actions-dropdown',
    buttons: actionsToButtonGroup({
      actions: recordActions,
      params: actionParams,
      handleClick: handleActionClick,
      translateFunctions,
      modalFunctions,
    }),
  }];
  const contentTag = getResourceElementCss(resource.id, 'table-row');

  return (
    <TableRow className={isSelected ? 'selected' : 'not-selected'} onClick={handleClick} onMouseDown={handleWheelClick}
              data-id={record.id}
              data-css={contentTag}>
      <TableCell width={0}>
        {onSelect && record.bulkActions.length ? (
          <CheckBox
            onChange={() => onSelect(record)}
            checked={isSelected}
          />
        ) : null}
      </TableCell>
      {resource.listProperties.map((property) => {
        const cellTag = `${resource.id}-${property.name}-table-cell`;
        return (
          <TableCell
            style={{ cursor: 'pointer' }}
            key={property.propertyPath}
            data-property-name={property.propertyPath}
            display={display(property.isTitle)}
            data-css={cellTag}
          >
            {isLoading ? (
              <Placeholder style={{ height: 14 }} />
            ) : (
              <BasePropertyComponent
                key={property.propertyPath}
                where="list"
                property={property}
                resource={resource}
                record={record}
              />
            )}
          </TableCell>
        );
      })}
      <TableCell key="options" className="options">
        {recordActions.length ? (
          <ButtonGroup buttons={buttons} />
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default RecordInList;
