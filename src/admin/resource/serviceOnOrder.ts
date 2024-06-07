import type { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

export const ServiceOnOrderResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("ServiceOnOrder"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: false,
    actions: {
      edit: {
        isVisible: false,
        isAccessible: false,
      },
      new: {
        isVisible: false,
        isAccessible: false,
      },
      list: {
        isVisible: false,
        isAccessible: false,
      },
      show: {
        isVisible: false,
        isAccessible: false,
      },
      delete: {
        isVisible: false,
        isAccessible: false,
      },
      bulkDelete: {
        isVisible: false,
        isAccessible: false,
      },
    }
  }
};
