const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';

import { IRolesPersistence } from '../../src/persistence/IRolesPersistence';
import { UserRolesV1 } from '../../src/data/version1/UserRolesV1';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];
    
export class RolesPersistenceFixture {
    private _persistence: IRolesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async testGetAndSetRoles() {

        // Set party roles
        let roles = await this._persistence.set(
            null,
            new UserRolesV1('1', ROLES)
        );

        assert.lengthOf(roles.roles, 3);

        // Read and check party roles
        roles = await this._persistence.getOneById(null, '1');

        assert.lengthOf(roles.roles, 3);

        // Get by filter
        let page = await this._persistence.getPageByFilter(
            null, FilterParams.fromTuples('roles', ['Role 1', 'Role X']), null
        );

        assert.lengthOf(page.data, 1);
    }

}
