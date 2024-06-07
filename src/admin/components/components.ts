import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Sidebar: componentLoader.override('SidebarBranding', './SidebarLogo'),
  PropertyDescription: componentLoader.override('PropertyDescription', './Tooltip/Tooltip'),
  BooleanPropertyValue: componentLoader.override(
    'BooleanPropertyValue',
    './BooleanComponent',
  ),
  PropertyHeader: componentLoader.override("PropertyHeader", "./table/PropertyHeader"),
  RecordsTableHeader: componentLoader.override('RecordsTableHeader', './table/RecordsTableHeader'),
  RecordInList: componentLoader.override("RecordInList", "./table/RecordInList"),
  ReferenceValue: componentLoader.override(
    'DefaultReferenceValue',
    './ref-value',
  ),
  Dashboard: componentLoader.add('Dashboard', './Dashboard'),
  ManyToManyEdit: componentLoader.add('ManyToManyEdit', './many-to-many.edit'),
  ManyToManyShow: componentLoader.add('ManyToManyShow', './many-to-many.show'),
  ManyToManyList: componentLoader.add('ManyToManyList', './many-to-many.list'),
  KeyValueAmount: componentLoader.add('KeyValueAmount', './keyValueWithAmount/KeyValue'),
  // TagListShow: componentLoader.add('TagListShow', './tagList/TagList.show'),
  // TagListEdit: componentLoader.add('TagListEdit', './tagList/TagList.edit'),
};

export { componentLoader, Components };