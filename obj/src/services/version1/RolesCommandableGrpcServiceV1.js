"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class RolesCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-roles', 'controller', 'default', '*', '*'));
    }
}
exports.RolesCommandableGrpcServiceV1 = RolesCommandableGrpcServiceV1;
//# sourceMappingURL=RolesCommandableGrpcServiceV1.js.map