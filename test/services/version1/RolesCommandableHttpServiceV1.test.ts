const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesCommandableHttpServiceV1 } from '../../../src/services/version1/RolesCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesCommandableHttpServiceV1', ()=> {
    let persistence: RolesMemoryPersistence;
    let service: RolesCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-roles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-roles', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        await persistence.clear(null);
    });
    
    test('Get and Set Roles', async () => {
        // Set party roles
        let roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/set_roles',
                {
                    user_id: '1',
                    roles: ROLES
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 3);

        // Read and check party roles
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/get_roles_by_id',
                {
                    user_id: '1'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 3);
    });

    test('Grant and Revoke Roles', async () => {

        // Grant roles first time
        let roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/grant_roles',
                {
                    user_id: '1',
                    roles: ['Role1']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role1']);

        // Grant roles second time
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/grant_roles',
                {
                    user_id: '1',
                    roles: ['Role1', 'Role2', 'Role3']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 3);
        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

        // Revoke roles first time
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/revoke_roles',
                {
                    user_id: '1',
                    roles: ['Role1']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Get roles
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/get_roles_by_id',
                {
                    user_id: '1'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Revoke roles second time
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/revoke_roles',
                {
                    user_id: '1',
                    roles: ['Role1', 'Role2']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role3']);

    });

    test('Authorize', async () => {

        // Grant roles
        let roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/grant_roles',
                {
                    user_id: '1',
                    roles: ['Role_1', 'Role_2']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(roles, 2);

        // Authorize positively
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/authorize',
                {
                    user_id: '1',
                    roles: ['Role_1']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isTrue(result);

        // Authorize negatively
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/roles/authorize',
                {
                    user_id: '1',
                    roles: ['Role_2', 'Role_3']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        if (Object.keys(result).length == 0)
            result = false;

        assert.isFalse(result);
    });

});