"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class RolesCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-roles', 'controller', 'default', '*', '1.0'));
    }
}
exports.RolesCommandableHttpServiceV1 = RolesCommandableHttpServiceV1;
//# sourceMappingURL=RolesCommandableHttpServiceV1.js.map