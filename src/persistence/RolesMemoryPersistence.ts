import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from './IRolesPersistence';

export class RolesMemoryPersistence 
    extends IdentifiableMemoryPersistence<UserRolesV1, string> 
    implements IRolesPersistence {

    constructor() {
        super();
    }


    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i2]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let exceptIds = filter.getAsObject('except_ids');
        let roles = filter.getAsObject('roles');
        let exceptRoles = filter.getAsObject('except_roles');
        
        // Process ids filter
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;

        // Process except ids filter
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (!Array.isArray(exceptIds))
            exceptIds = null;

        // Process roles filter
        if (typeof roles == 'string')
            roles = roles.split(',');
        if (!Array.isArray(roles))
            roles = null;

        // Process except roles filter
        if (typeof exceptRoles == 'string')
            exceptRoles = exceptRoles.split(',');
        if (!Array.isArray(exceptRoles))
            exceptRoles = null;
        
        return (item: UserRolesV1) => {
            if (id && item.id != id) 
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (exceptIds && exceptIds.indexOf(item.id) >= 0)
                return false;
            if (roles && !this.contains(roles, item.roles))
                return false;
            if (exceptRoles && this.contains(exceptRoles, item.roles))
                return false;
            return true; 
        };
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
