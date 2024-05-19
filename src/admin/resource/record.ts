import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from "adminjs";
import { PrismaClient } from "@prisma/client";

const recordsNavigation = {
  icon: "BookOpen"
};

export const RecordResource = (client: PrismaClient): ResourceWithOptions => ({
  resource: {
    model: getModelByName("Record"),
    client,
    options: {}
  },
  options: {
    navigation: recordsNavigation,
    properties: {
      id: {
        isVisible: false
      },
      amount: {
        type: "number",
        props: {
          type: "number",
        }
      },
      createdAt: {
        isVisible: true,
        position: 1
      },
      comment: {
        type: "richtext",
      }
    },
    sort: {
      sortBy: "createdAt",
      direction: "desc"
    }
  }
});