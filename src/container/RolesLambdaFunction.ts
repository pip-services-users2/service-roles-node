import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';

import { RolesServiceFactory } from '../build/RolesServiceFactory';

export class RolesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("roles", "User roles function");
        this._dependencyResolver.put('controller', new Descriptor('service-roles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesServiceFactory());
    }
}

export const handler = new RolesLambdaFunction().getHandler();