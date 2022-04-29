"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class RolesHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-roles', 'controller', 'default', '*', '1.0'));
    }
}
exports.RolesHttpServiceV1 = RolesHttpServiceV1;
//# sourceMappingURL=RolesHttpServiceV1.js.map