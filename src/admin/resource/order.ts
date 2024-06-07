import { ActionContext, ActionRequest, ActionResponse, BaseRecord, ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";
import { injectManyToManySupport } from "../hooks/many-to-many.hook.js";
import { Components } from "../components/components.js";

const orderNavigation = {
  icon: 'Book'
};

const getSum =
  async (response: ActionResponse, request: ActionRequest, context: ActionContext) => {
    const key = "sum";
    const { record, records } = context;

    if (record) {
      const orderServices = await prisma.serviceOnOrder.findMany({
        where: {
          orderId: record?.params.id
        },
        include: {
          service: true
        }
      });
      response.record.params[key] = orderServices.map(o => o.amount * o.service.price).reduce((acc, val) => acc + val);
    } else if (records) {
      const orderServices = await prisma.serviceOnOrder.findMany({
        where: {
          orderId: {
            in: records.map(r => r.params.id)
          }
        },
        include: {
          service: true
        }
      });
      for (const record of records) {
        const sum = orderServices.filter(o => o.orderId === record.params.id)
          .map(o => o.amount * o.service.price)
          .reduce((acc, val) => acc + val);
        response.records = response.records.map((rec: BaseRecord) =>
          rec.params.id === record.params.id ? {
            ...rec,
            params: {
              ...rec.params,
              [key]: sum
            }
          } : rec
        );
      }
    }
    return response;
  };

export const OrderResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Order"),
    client: prisma,
    options: {}
  },
  options: injectManyToManySupport({
      navigation: orderNavigation,
      properties: {
        sum: {
          isVisible: {
            show: true,
            edit: false,
            list: true,
            filter: false,
          }
        },
        describe: {
          type: "richtext"
        },
        workplan: {
          type: "richtext"
        },
        status: {
          availableValues: [
            { label: "Создан", value: "created" },
            { label: "В работе", value: "processing" },
            { label: "Выполнен", value: "done" },
            { label: "Отменен", value: "canceled" }
          ]
        },
        createdAt: {
          isVisible: {
            show: true,
            list: true,
            filter: true,
            edit: false
          }
        },
        updatedAt: {
          isVisible: {
            show: true,
            list: true,
            filter: true,
            edit: false
          }
        }
      },
      actions: {
        new: {
          before: async (request) => {
            return request;
          },
        },
        edit: {
          before: async (request) => {
            return request;
          },
        },
        show: {
          before: async (request) => {
            return request;
          },
        },
        list: {
          before: async (request) => {
            return request;
          },
        },
        delete: {
          before: async (request) => {
            return request;
          },
        },
        bulkDelete: {
          before: async (request) => {
            return request;
          },
        },
      }
    }, [{
      propertyName: "services", modelClassName: "Service", components: {
        edit: Components.KeyValueAmount
      }
    }, { propertyName: "developers", modelClassName: "Developer" }],
    {
      show: [getSum],
      list: [getSum],
    })
};