import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const developerNavigation = {
  icon: 'Tool'
};

export const DeveloperResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Developer"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: developerNavigation,
    properties: {
      describe: {
        type: "richtext"
      },
      birthday: {
        type: "date"
      }
    }
  }
};