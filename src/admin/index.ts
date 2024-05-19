import Connect from "connect-pg-simple";
import session from "express-session";
import bcrypt from "bcrypt";
import { Database } from '@adminjs/prisma';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { buildAuthenticatedRouter } from "@adminjs/express";

import localeRu from "./locale.js";
import config from "../config.js";
import { IngredientResource } from "./resource/ingredient.js";
import { PrismaClient } from "@prisma/client";
import { RecordResource } from "./resource/record.js";
import { ProductResource } from "./resource/product.js";
import { componentLoader } from "./components/components.js";
import { CustomResource } from "./admin.resource.js";
import { IncidentResource } from "./resource/incident.js";

export const prisma = new PrismaClient();

// await prisma.ingredient.create({
//   data: {
//     name: "Ingredient",
//     products: {
//       create: [
//         {
//           name: "Activia"
//         },
//         {
//           name: "Something"
//         }
//       ]
//     }
//   }
// });

AdminJS.registerAdapter({ Database, Resource: CustomResource });

const login = config.ADMIN_LOGIN;
const pass = config.ADMIN_PASSWORD;

const ADMIN_USERS = [
  {
    email: login,
    password: pass,
    role: "admin"
  }
];

const authenticate = async (email: string, password: string) => {
  const trimedName = email.trim();
  const adminUser = ADMIN_USERS.find(
    (e) => e.email === trimedName
  );
  if (!adminUser)
    return null;
  const valid = await bcrypt.compare(password, adminUser.password);
  if (!valid)
    return null;

  return Promise.resolve({
    email: adminUser.email,
    role: adminUser.role
  });
};

const ConnectSession = Connect(session);
const sessionStore = new ConnectSession({
  conObject: {
    connectionString: config.DATABASE_URL,
    ssl: false
  },
  tableName: "session",
  createTableIfMissing: true
});

const adminOptions: AdminJSOptions = {
  resources: [
    IngredientResource(prisma),
    ProductResource(prisma),
    RecordResource(prisma),
    IncidentResource(prisma)
  ],
  componentLoader: componentLoader,
  locale: {
    language: 'ru',
    availableLanguages: ['ru'],
    translations: {
      ru: localeRu
    },
  },
  branding: {
    companyName: 'Дневник Питания',
    withMadeWithLove: false,
  }
};

export const admin = new AdminJS(adminOptions);

export const adminRouter = buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret"
  },
  null,
  {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: false
    },
    name: "adminjs"
  }
);