import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from "adminjs";
import { PrismaClient } from "@prisma/client";
import { injectManyToManySupport } from "../hooks/many-to-many.hook.js";

const productsNavigation = {
  icon: "ShoppingBag"
};

export const ProductResource = (client: PrismaClient): ResourceWithOptions => ({
  resource: {
    model: getModelByName("Product"),
    client,
    options: {}
  },
  options: injectManyToManySupport({
    navigation: productsNavigation,
    properties: {},
    actions: {
      new: {
        before: async (request) => {
          return request;
        },
      },
      edit: {
        before: async (request) => {
          return request;
        },
      },
      show: {
        before: async (request) => {
          return request;
        },
      },
      list: {
        before: async (request) => {
          return request;
        },
      },
      delete: {
        before: async (request) => {
          return request;
        },
      },
      bulkDelete: {
        before: async (request) => {
          return request;
        },
      },
    },
  }, [{ propertyName: 'Ingredients', modelClassName: 'Ingredient' }])
});