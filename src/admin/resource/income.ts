import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const incomeNavigation = {
  icon: 'TrendingUp'
};

export const IncomeResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Income"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: incomeNavigation,
    properties: {
      amount: {
        type: 'number',
        props: {
          type: "number"
        }
      },
      describe: {
        type: "richtext"
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
    }
  }
};