import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { ISetter } from 'pip-services3-data-nodex';

import { UserRolesV1 } from '../data/version1/UserRolesV1';

export interface IRolesPersistence 
    extends IGetter<UserRolesV1, string>, ISetter<UserRolesV1> 
{
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>>;

    getOneById(correlation_id: string, id: string): Promise<UserRolesV1>;

    set(correlation_id: string, item: UserRolesV1): Promise<UserRolesV1>;
}
