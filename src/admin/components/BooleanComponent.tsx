import { useTranslation } from "adminjs";

import { Badge } from "@adminjs/design-system";
import React from "react";

const BooleanComponent = (props: any) => {
  const { record, property, resource } = props;
  const { translateProperty } = useTranslation();
  const rawValue = record?.params[property.path];

  if (typeof rawValue === 'undefined' || rawValue === '')
    return null;

  const base = rawValue ? 'Да' : 'Нет';

  const translation = translateProperty(
    `${property.path}.${rawValue}`,
    resource.id,
    {
      defaultValue: base,
    },
  );

  return (
    <Badge
      variant={rawValue ? 'success' : 'grey40'}
      outline
      size="sm"
    >
      {translation}
    </Badge>
  );
};

export default BooleanComponent;
