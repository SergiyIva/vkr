import Connect from "connect-pg-simple";
import session from "express-session";
import bcrypt from "bcrypt";
import { Database } from '@adminjs/prisma';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { buildAuthenticatedRouter } from "@adminjs/express";

import localeRu from "./locale.js";
import config from "../config.js";
import { componentLoader, Components } from "./components/components.js";
import { CustomResource } from "./admin.resource.js";
import { AdministratorResource } from "./resource/administrator.js";
import { DeveloperResource } from "./resource/developer.js";
import { OrderResource } from "./resource/order.js";
import { CustomerResource } from "./resource/customer.js";
import { ServiceResource } from "./resource/service.js";
import { ServiceOnOrderResource } from "./resource/serviceOnOrder.js";
import { IncomeResource } from "./resource/income.js";
import { ExpenseResource } from "./resource/expense.js";
import { StageResource } from "./resource/stage.js";
import { CategoryResource } from "./resource/category.js";
import { DocumentResource } from "./resource/document.js";
import { prisma } from "./db.js";

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
  if (!adminUser) {
    const user = await prisma.administrator.findUnique({
      where: {
        login: trimedName
      }
    });
    if (!user)
      return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return null;

    return Promise.resolve({
      email: user.login,
      role: user.role
    });
  }
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
    AdministratorResource,
    DeveloperResource,
    CustomerResource,
    OrderResource,
    IncomeResource,
    ExpenseResource,
    StageResource,
    CategoryResource,
    ServiceResource,
    ServiceOnOrderResource,
    DocumentResource
  ],
  componentLoader: componentLoader,
  locale: {
    language: 'ru',
    availableLanguages: ['ru'],
    translations: {
      ru: localeRu
    },
  },
  dashboard: { component: Components.Dashboard },
  branding: {
    companyName: 'Система учёта',
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