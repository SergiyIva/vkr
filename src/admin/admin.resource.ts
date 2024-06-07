import { Resource as PrismaResource } from '@adminjs/prisma';
import { BaseRecord, BaseResource } from 'adminjs';
import { prisma } from "./db.js";

export class CustomResource extends PrismaResource {
  get getManager() {
    //@ts-ignore
    return this.manager;
  }

  wrapObjects(objects: any) {
    return objects.map(
      (sequelizeObject: any) => new BaseRecord(sequelizeObject, this),
    );
  }
  async findRelated(record: any, resource: CustomResource, property: string) {
    const includeProp = property;
    const relatives = await resource.getManager.findUnique({
      where: { id: record.params.id },
      select: {
        [includeProp]: true
      }
    });

    return relatives[includeProp];
  }

  getId(id: string | number) {
    if (/\D/.test(id.toString())) {
      if (/id\d+/.test(id.toString())) {
        return +`${id}`.replace("id", "");
      }
      return id;
    }

    return +id;
  }

  async saveRecords(
    record: any,
    resourceId: any,
    ids: { id: string | number } & { [key: string]: any }[],
  ) {
    // @ts-ignore
    const model = this.manager;
    let instance;
    if (ids.length && Object.keys(ids[0]).length > 1) {
      const idList =
        ids.map((value) => {
            const { id, ...rest } = value;
            const intValues = ["amount", "price", "quantity", "sum"];
            for (const intValue of intValues) {
              if (intValue in rest) {
                rest[intValue] = +rest[intValue];
              }
            }
            return {
              ...rest,
              [this.singularize(resourceId.toLowerCase())]: { connect: { id: this.getId(id) } }
            };
          }
        );
      let _p;
      [_p, instance] = await prisma.$transaction([
          model.update({
            where: { id: record.params.id },
            data: {
              [resourceId.toLowerCase()]: {
                deleteMany: {}
              }
            }
          }),
          model.update({
            where: { id: record.params.id },
            data: {
              [resourceId.toLowerCase()]: {
                create: idList
              }
            }
          })
        ]
      );
    } else {
      const idList = ids.length ?
        ids.map((value) => ({
          id: this.getId(value.id)
        })) : [];
      instance = await model.update({
        where: { id: record.params.id },
        data: {
          [resourceId.toLowerCase()]: {
            set: idList
          }
        }
      });
    }
    if (!instance) {
      throw new Error('Instance not found');
    }
  }

  private singularize(word: string) {
    const endings = {
      ves: 'fe',
      ies: 'y',
      i: 'us',
      zes: 'ze',
      ses: 's',
      es: 'e',
      s: ''
    };
    return word.replace(
      new RegExp(`(${Object.keys(endings).join('|')})$`),
      r => endings[r as keyof typeof endings]
    );
  }

  getManyReferences(): (BaseResource | null)[] {
    return this.decorate()
      .getProperties({ where: 'edit' })
      .filter((p: any) => {
        return p.type() === 'reference';
      })
      .map((p) => p.reference());
  }

  getManyProperties(): string[] {
    return this.decorate()
      .getProperties({ where: 'edit' })
      .filter((p: any) => {
        return p.type() === 'reference';
      })
      .map((p) => p.name());
  }
}
