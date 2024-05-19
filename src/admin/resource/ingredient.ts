// @ts-ignore
import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from "adminjs";
import { PrismaClient } from "@prisma/client";

const ingredientsNavigation = {
  icon: "Trello"
};

export const IngredientResource = (client: PrismaClient): ResourceWithOptions => ({
  resource: {
    model: getModelByName("Ingredient"),
    client,
    options: {}
  },
  options: {
    navigation: ingredientsNavigation,
    properties: {}
  }
});