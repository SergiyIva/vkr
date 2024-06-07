import { ActionContext, ActionRequest, ActionResponse, BaseRecord, ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const customerNavigation = {
  icon: 'Smile'
};

const getOrders =
  async (response: ActionResponse, request: ActionRequest, context: ActionContext) => {
    const key = "orderCount";
    const { record, records } = context;

    if (record) {
      response.record.params[key] = await prisma.order.count({
        where: {
          customer: { id: record?.params.id }
        }
      });
    } else if (records) {
      for (const record of records) {
        const orderCount = await prisma.order.count({
          where: {
            customer: { id: record?.params.id }
          }
        });
        response.records = response.records.map((rec: BaseRecord) =>
          rec.params.id === record.params.id ? {
            ...rec,
            params: {
              ...rec.params,
              [key]: orderCount
            }
          } : rec
        );
      }
    }
    return response;
  };

export const CustomerResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Customer"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: customerNavigation,
    properties: {
      orderCount: {
        isVisible: {
          show: true,
          edit: false,
          list: true,
          filter: false,
        }
      }
    },
    actions: {
      show: {
        after: [getOrders]
      },
      list: {
        after: [getOrders]
      },
      new: {
        isVisible: true
      }
    }
  }
};