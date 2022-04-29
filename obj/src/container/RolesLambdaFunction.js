"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.RolesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const RolesServiceFactory_1 = require("../build/RolesServiceFactory");
class RolesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesServiceFactory_1.RolesServiceFactory());
    }
}
exports.RolesLambdaFunction = RolesLambdaFunction;
exports.handler = new RolesLambdaFunction().getHandler();
//# sourceMappingURL=RolesLambdaFunction.js.map