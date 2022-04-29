const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesCommandableGrpcServiceV1 } from '../../../src/services/version1/RolesCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesCommandableGrpcServiceV1', ()=> {
    let service: RolesCommandableGrpcServiceV1;
    let persistence: RolesMemoryPersistence;

    let client: any;

    suiteSetup(async () => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-roles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-roles', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        await persistence.clear(null);
    });

    test('Get and Set Roles', async () => {

        // Set party roles
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.set_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ROLES
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 3);

        // Read and check party roles
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.get_roles_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 3);
    });

    test('Grant and Revoke Roles', async () => {

        // Grant roles first time
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.grant_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role1']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role1']);

        // Grant roles second time
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.grant_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role1', 'Role2', 'Role3']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 3);
        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

        // Revoke roles first time
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.revoke_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role1']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Get roles
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.get_roles_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Revoke roles second time
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.revoke_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role1', 'Role2']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role3']);
    });

    test('Authorize', async () => {
        // Grant roles
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.grant_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role_1', 'Role_2']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let roles = JSON.parse(response.result_json);

        assert.lengthOf(roles, 2);


        // Authorize positively
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.authorize',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role_1']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let result = JSON.parse(response.result_json);

        assert.isTrue(result);

        // Authorize negatively
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/roles.authorize',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        roles: ['Role_1']
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        result = JSON.parse(response.result_json);

        if (Object.keys(result).length == 0)
            result = false;

        assert.isFalse(result);

    });

});
