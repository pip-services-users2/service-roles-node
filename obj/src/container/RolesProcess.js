"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class RolesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.RolesProcess = RolesProcess;
//# sourceMappingURL=RolesProcess.js.map