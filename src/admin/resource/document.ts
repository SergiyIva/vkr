import { ResourceWithOptions } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { prisma } from "../db.js";
import uploadFeature from "@adminjs/upload";
import { componentLoader } from "../components/components.js";
import UploadProvider from "../providers/UploadProvider.js";
import { __dirname } from "../../varCJS.js";

const localProvider = {
  bucket: __dirname + '/../public/uploads',
  opts: {
    baseUrl: '/uploads',
  },
};

const documentNavigation = {
  icon: 'FileText'
};

export const DocumentResource: ResourceWithOptions = {
  resource: {
    model: getModelByName("Document"),
    client: prisma,
    options: {}
  },
  options: {
    navigation: documentNavigation,
    properties: {
      file: {
        isVisible: false
      },
      describe: {
        type: "richtext"
      }
    }
  },
  features: [
    uploadFeature({
      properties: {
        key: 'file',
        size: '50Mb',
        file: 'Файл',
      },
      componentLoader,
      provider: new UploadProvider(localProvider.bucket, localProvider.opts),
      validation: {
        maxSize: 1048576 * 10,
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp',
          "application/pdf", "text/plain", "text/html", "text/csv", "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.template", "application/vnd.ms-word.document.macroEnabled.12",
          "application/vnd.ms-word.template.macroEnabled.12", "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-access"],
      },
    }),
  ],
};