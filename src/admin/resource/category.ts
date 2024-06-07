import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const categoryNavigation = {
  icon: 'Tag'
};

export const CategoryResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Category"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: categoryNavigation,
    properties: {
      describe: {
        type: "richtext"
      }
    }
  }
};