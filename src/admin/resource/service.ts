import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";
import { injectManyToManySupport } from "../hooks/many-to-many.hook.js";

const serviceNavigation = {
  icon: 'Star'
};

export const ServiceResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Service"),
    client: prisma,
    options: {}
  },
  options: injectManyToManySupport({
    navigation: serviceNavigation,
    properties: {
      describe: {
        type: "richtext"
      },
      price: {
        type: 'number',
        props: {
          type: "number"
        }
      },
      createdAt: {
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
  }, [{ propertyName: "categories", modelClassName: "Category" }],)
};