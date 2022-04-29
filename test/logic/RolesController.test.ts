const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../src/logic/RolesController';

let ROLES: string[] = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesController', ()=> {
    let controller: RolesController;

    setup(() => {
        let persistence = new RolesMemoryPersistence();
        controller = new RolesController();

        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-roles', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });

    test('Get and Set Roles', async () => {
        // Update party roles
        let roles = await controller.setRoles(
            null,
            '1',
            ROLES
        );

        assert.lengthOf(roles, 3);

        // Read and check party roles
        roles = await controller.getRolesById(
            null,
            '1',
        );

        assert.lengthOf(roles, 3);
    });

    test('Grant and Revoke Roles', async () => {
        // Grant roles first time
        let roles = await controller.grantRoles(
            null,
            '1',
            ['Role 1']
        );

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role 1']);

        // Grant roles second time
        roles = await controller.grantRoles(
            null,
            '1',
            ['Role 1', 'Role 2', 'Role 3']
        );

        assert.lengthOf(roles, 3);
        assert.sameMembers(roles, ['Role 1', 'Role 2', 'Role 3']);

        // Revoke roles first time
        roles = await controller.revokeRoles(
            null,
            '1',
            ['Role 1']
        );

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role 2', 'Role 3']);

        // Get roles
        roles = await controller.getRolesById(null, '1');
        
        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role 2', 'Role 3']);

        // Revoke roles second time
        roles = await controller.revokeRoles(
            null,
            '1',
            ['Role 1', 'Role 2']
        );

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role 3']);
    });

    test('Authorize', async () => {

        // Grant roles
        let roles = await controller.grantRoles(
            null,
            '1',
            ['Role 1', 'Role 2']
        );

        assert.lengthOf(roles, 2);

        // Authorize positively
        let result = await controller.authorize(
            null,
            '1',
            ['Role 1']
        );

        assert.isTrue(result);

        // Authorize negatively
        result = await controller.authorize(
            null,
            '1',
            ['Role 2', 'Role 3']
        );

        assert.isFalse(result);
    });
    
});