import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<UserRolesV1, string> 
    implements IRolesPersistence {

    constructor() {
        super('user_roles');
    }

    private composeFilter(filter: FilterParams) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (Array.isArray(exceptIds))
            criteria.push({ _id: { $nin: exceptIds } });

        // Filter roles
        let roles = filter.getAsObject('roles');
        if (typeof roles == 'string')
            roles = roles.split(',');
        if (Array.isArray(roles))
            criteria.push({ roles: { $in: roles } });

        // Filter except roles
        let exceptRoles = filter.getAsObject('except_roles');
        if (typeof exceptRoles == 'string')
            exceptRoles = exceptRoles.split(',');
        if (Array.isArray(exceptRoles))
            criteria.push({ roles: { $nin: exceptRoles } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async set(correlationId: string, item: UserRolesV1): Promise<UserRolesV1> {
        if (item == null) return;

        item = Object.assign({}, item);
        item.update_time = new Date();
        return await super.set(correlationId, item);
    }

}
