import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from "adminjs";
import { PrismaClient } from "@prisma/client";

const incidentsNavigation = {
  icon: "AlertTriangle"
};

export const IncidentResource = (client: PrismaClient): ResourceWithOptions => ({
  resource: {
    model: getModelByName("Incident"),
    client,
    options: {}
  },
  options: {
    navigation: incidentsNavigation,
    properties: {
      id: {
        isVisible: false
      },
      createdAt: {
        isVisible: true,
        type: "date",
        position: 1
      },
      description: {
        type: "richtext",
      }
    },
    sort: {
      sortBy: "createdAt",
      direction: "desc"
    }
  }
});