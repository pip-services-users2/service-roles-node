const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { RolesLambdaFunction } from '../../src/container/RolesLambdaFunction';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesLambdaFunction', ()=> {
    let lambda: RolesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-roles:persistence:memory:default:1.0',
            'controller.descriptor', 'service-roles:controller:default:default:1.0'
        );

        lambda = new RolesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Grant and Revoke Roles', async () => {
        // Grant roles first time
        let roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'grant_roles',
                user_id: '1',
                roles: ['Role1']
            }
        );

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role1']);

        // Grant roles second time
        roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'grant_roles',
                user_id: '1',
                roles: ['Role1', 'Role2', 'Role3']
            }
        );

        assert.lengthOf(roles, 3);
        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

        // Revoke roles first time
        roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'revoke_roles',
                user_id: '1',
                roles: ['Role1']
            }
        );

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Get roles
        roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'get_roles_by_id',
                user_id: '1'
            }
        );

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);


        // Revoke roles second time
        roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'revoke_roles',
                user_id: '1',
                roles: ['Role1', 'Role2']
            }
        );

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role3']);

    });

});