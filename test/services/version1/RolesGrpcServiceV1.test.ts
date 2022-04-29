const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RolesMemoryPersistence } from '../../../src/persistence/RolesMemoryPersistence';
import { RolesController } from '../../../src/logic/RolesController';
import { RolesGrpcServiceV1 } from '../../../src/services/version1/RolesGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('RolesGrpcServiceV1', () => {
    let service: RolesGrpcServiceV1;
    let persistence: RolesMemoryPersistence;

    let client: any;

    suiteSetup(async () => {
        persistence = new RolesMemoryPersistence();
        let controller = new RolesController();

        service = new RolesGrpcServiceV1();
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
        await  service.close(null);
    });

    setup(async () => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/roles_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).roles_v1.Roles;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        await persistence.clear(null);
    });

    test('Get and Set Roles', async () => {
        // Set party roles
        let roles = await new Promise<any>((resolve, reject) => {
            client.set_roles(
                {
                    user_id: '1',
                    roles: ROLES
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 3);

        // Read and check party roles
        roles = await new Promise<any>((resolve, reject) => {
            client.get_roles_by_id(
                {
                    user_id: '1'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 3);
    });

    test('Grant and Revoke Roles', async () => {
        // Grant roles first time
        let roles = await new Promise<any>((resolve, reject) => {
            client.grant_roles(
                {
                    user_id: '1',
                    roles: ['Role1']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role1']);

        // Grant roles second time
        roles = await new Promise<any>((resolve, reject) => {
            client.grant_roles(
                {
                    user_id: '1',
                    roles: ['Role1', 'Role2', 'Role3']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 3);
        assert.sameMembers(roles, ['Role1', 'Role2', 'Role3']);

        // Revoke roles first time
        roles = await new Promise<any>((resolve, reject) => {
            client.revoke_roles(
                {
                    user_id: '1',
                    roles: ['Role1']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);

        // Get roles
        roles = await new Promise<any>((resolve, reject) => {
            client.get_roles_by_id(
                {
                    user_id: '1'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 2);
        assert.sameMembers(roles, ['Role2', 'Role3']);


        // Revoke roles second time
        roles = await new Promise<any>((resolve, reject) => {
            client.revoke_roles(
                {
                    user_id: '1',
                    roles: ['Role1', 'Role2']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 1);
        assert.sameMembers(roles, ['Role3']);
    });

    test('Authorize', async () => {
        let roles = await new Promise<any>((resolve, reject) => {
            client.grant_roles(
                {
                    user_id: '1',
                    roles: ['Role_1', 'Role_2']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.roles);
                }
            );
        });

        assert.lengthOf(roles, 2);

        // Authorize positively
        let authorized = await new Promise<any>((resolve, reject) => {
            client.authorize(
                {
                    user_id: '1',
                    roles: ['Role_1']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.authorized);
                }
            );
        });

        assert.isTrue(authorized);

        // Authorize negatively
        authorized = await new Promise<any>((resolve, reject) => {
            client.authorize(
                {
                    user_id: '1',
                    roles: ['Role_2', 'Role_3']
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response.authorized);
                }
            );
        });

        assert.isFalse(authorized);

    });

});
