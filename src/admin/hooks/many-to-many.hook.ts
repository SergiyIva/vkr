import { ActionRequest, PropertyType, RecordActionResponse, ResourceOptions, } from 'adminjs';
import { unflatten } from 'flat';
import { CustomResource } from '../admin.resource.js';
import { Components } from '../components/components.js';

const getRelations = async (
  response: any,
  resource: any,
  record: any,
  reference: any,
  prop: string,
  isList = false,
) => {
  const throughItems = await resource.findRelated(record, resource, prop);
  if (throughItems.length) {
    const items = reference.wrapObjects(throughItems);
    if (items.length) {
      if (isList) {
        response.records = response.records.map((rec: any) =>
          rec.id.toString() === record.params.id.toString()
            ? {
              ...rec,
              params: {
                ...rec.params,
                [prop]: items.map((v: any) => v.params.id),
              },
            }
            : rec,
        );
      } else {
        response.record.params[prop] = items.map((v: any) => v.params.id);
        for (const item of items) {
          response.record.populated[`${prop}.${item.params.id}`] = item;
        }
      }
    }
  }
};

const setResponseItems = async (
  context: any,
  response: any,
  reference: CustomResource,
  manyProperties: string[],
) => {
  const { _admin, resource, record, records } = context;
  for (const prop of manyProperties) {
    if (record) {
      await getRelations(response, resource, record, reference, prop);
    } else if (records.length) {
      for (const rec of records) {
        await getRelations(response, resource, rec, reference, prop, true);
      }
    }
  }
};

const after = async (
  response: RecordActionResponse,
  request: ActionRequest,
  context: any,
) => {
  if (request && request.method) {
    const { record } = context;
    const manyProperties = context.resource.getManyProperties() as string[];
    const manyReferences =
      context.resource.getManyReferences() as (CustomResource)[];

    const manyToManyProperties = manyProperties;
    //   manyProperties.filter(
    //   (prop) =>
    //     //@ts-ignore
    //     Object.keys(context.resource.model.associations).indexOf(
    //       prop,
    //     ) >= 0,
    // );

    const getCircularReplacer = () => {
      const seen = new WeakSet();

      return (key: any, value: any) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }

        return value;
      };
    };

    if (request.method === 'get' && request.params.action === 'list') {
      await Promise.all(
        manyReferences.map(async (reference: CustomResource) => {
          await setResponseItems(
            context,
            response,
            reference,
            manyToManyProperties,
          );
        }),
      );
    }

    if (request.method === 'get' && request.params.action !== 'list') {
      await Promise.all(
        manyReferences.map(async (reference: CustomResource) => {
          await setResponseItems(
            context,
            response,
            reference,
            manyToManyProperties,
          );
        }),
      );
    }

    if (request.method === 'post' && record.isValid()) {
      const params = unflatten(request.payload) as { [key: string]: any };
      await Promise.all(
        manyToManyProperties.map(async (toResourceId: string) => {
          const ids = params[toResourceId] || [];
          if (ids.constructor !== Array || typeof ids[0] === 'string') return;
          await context.resource.saveRecords(record, toResourceId, ids);
        }),
      );
    }
  }

  return response;
};

export const manyToManyComponent = (
  reference: string,
  components?: { show?: string | false; edit?: string | false; list?: string | false },
) => ({
  isVisible: {
    list: true,
    show: true,
    filter: true,
    edit: true,
  },
  isArray: true,
  type: 'reference' as PropertyType,
  reference,
  components: {
    show: components?.show
      ? Components[components.show as keyof typeof Components]
      : Components.ManyToManyShow,
    edit: components?.edit
      ? Components[components.edit as keyof typeof Components]
      : Components.ManyToManyEdit,
    list: components?.list
      ? Components[components.list as keyof typeof Components]
      : Components.ManyToManyList,
  },
});

export const injectManyToManySupport = (
  options: ResourceOptions,
  properties: {
    propertyName: string;
    modelClassName: string;
    components?: { show?: string | false; edit?: string | false; list?: string | false },
  }[],
): ResourceOptions => {
  const afterFn = after;
  properties.forEach((propForSupport) => {
    options.properties![propForSupport.propertyName] = manyToManyComponent(
      propForSupport.modelClassName,
      propForSupport.components,
    );
    options.actions!.new!.after = [afterFn];
    options.actions!.edit!.after = [afterFn];
    options.actions!.show!.after = [after];
    //@ts-ignore
    options.actions!.list!.after = [after];
  });
  return options;
};
