import { BaseSchema, Output, parse, ValiError } from "valibot";
import dotenv from "dotenv";

type Envs = {
  [key: string]: any
}
export type EntryType = {
  name: string
  type: string
  default?: any
  fallback?: any
  wrapped?: {
    type: string
  }
}

dotenv.config();

const getEnvValue = (name: string, entry: EntryType) => {
  const isDevValue = process.env.NODE_ENV !== "production" && !!entry.fallback;
  const value = isDevValue ? entry.fallback : process.env[name] ?? entry.default;

  let res = value;
  if (entry.type === "number" || entry.wrapped?.type === "number")
    res = +value;
  if (entry.type === "boolean" || entry.wrapped?.type === "boolean")
    res = value === "true";

  return res;
};

export const getConfig = <TSchema extends BaseSchema>(schema: TSchema & { entries: any }): Output<TSchema> => {
  const envs: Envs = {};
  for (const entry in schema.entries) {
    envs[entry] = getEnvValue(entry, schema.entries[entry]);
  }

  try {
    var config = parse(schema, envs);
  } catch (e) {
    if (e instanceof ValiError)
      e.issues.filter(err => !!err.path && !!err.path.length)
        .map((err) => err.path![0])
        .forEach(({
                    key,
                    value
                  }) => value ?
          (console.error(value, "is bad value to", key)) :
          (console.error(key, "variable doesn't exist!")));
    throw e;
  }

  return config;
};