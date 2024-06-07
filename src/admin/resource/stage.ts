import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";

const stageNavigation = {
  icon: 'Layers'
};

export const StageResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Stage"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: stageNavigation,
    properties: {
      price: {
        type: 'number',
        props: {
          type: "number"
        }
      },
      describe: {
        type: "richtext"
      },
      status: {
        availableValues: [
          { label: "Создан", value: "created" },
          { label: "В работе", value: "processing" },
          { label: "Выполнен", value: "done" },
          { label: "Оплачен", value: "payed" },
          { label: "Отменен", value: "canceled" }
        ]
      },
    }
  }
};