import type { ListActionResponse, RecordActionResponse, ResourceWithOptions } from "adminjs";
import bcrypt from "bcrypt";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const administratorNavigation = {
  icon: 'User'
};

export const AdministratorResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Administrator"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: administratorNavigation,
    properties: {
      login: {
        type: "string",
        isVisible: true
      },
      role: {
        availableValues: [{ label: "Админ", value: "user" }, { label: "Супер Админ", value: "admin" }]
      },
      password: {
        isVisible: {
          show: false,
          list: false,
          edit: true,
          filter: false
        }
      },
      createdAt: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true
        }
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
        before: async (request) => {
          if (request.payload?.password) {
            request.payload.password = await bcrypt.hash(request.payload.password, 10);
          }
          return request;
        },
      },
      show: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
        after: async (response: RecordActionResponse) => {
          response.record.params.password = '';
          return response;
        },
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
        before: async (request) => {
          if (request.method === 'post') {
            if (request.payload?.password) {
              request.payload.password = await bcrypt.hash(request.payload.password, 10);
            } else {
              delete request.payload?.password;
            }
          }
          return request;
        },
        after: async (response: RecordActionResponse) => {
          response.record.params.password = '';
          return response;
        },
      },
      list: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
        after: async (response: ListActionResponse) => {
          response.records.forEach((record) => {
            record.params.password = '';
          });
          return response;
        },
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
      },
      bulkDelete: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
      },
      search: {
        isVisible: false,
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
      }
    },
  }
};
