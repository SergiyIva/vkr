import { Resource as PrismaResource } from '@adminjs/prisma';
import { BaseRecord, BaseResource } from 'adminjs';

// const { BaseRecord } = require('admin-bro')
// module.exports = { Database, Resource: CustomResource };
// const { Op } = require('sequelize')

export class CustomResource extends PrismaResource {
  get getManager() {
    //@ts-ignore
    return this.manager;
  }
  titleField() {
    return this.decorate().titleProperty().name();
  }

  wrapObjects(objects: any) {
    return objects.map(
      (sequelizeObject: any) => new BaseRecord(sequelizeObject, this),
    );
  }
  async findRelated(record: any, resource: CustomResource, property: string) {
    const includeProp = property.toLowerCase();
    const relatives = await resource.getManager.findUnique({
      where: { id: record.params.id },
      select: {
        [includeProp]: true
      }
    });

    return relatives[includeProp];
  }

  async saveRecords(
    record: any,
    resourceId: any,
    ids: { id: string | number }[],
  ) {
    const idList = ids.map((value) => +value.id);
    // @ts-ignore
    const model = this.manager;
    const instance = await model.update({
      where: { id: record.params.id },
      data: {
        [resourceId.toLowerCase()]: {
          set: idList.map(id => ({ id }))
        }
      }
    });
    if (!instance) {
      throw new Error('Instance not found');
    }
  }

  primaryKeyField() {
    return this.id;
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
