import { number, object, optional, string } from "valibot";
import { getConfig } from "./utils/getConfig.js";

const ConfigSchema = object({
  PORT: optional(number(), 3000),
  DATABASE_URL: string(),
  ADMIN_LOGIN: string(),
  ADMIN_PASSWORD: string(),
});

export default getConfig(ConfigSchema);
