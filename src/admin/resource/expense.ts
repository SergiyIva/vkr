import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const expenseNavigation = {
  icon: 'TrendingDown'
};

export const ExpenseResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Expense"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: expenseNavigation,
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