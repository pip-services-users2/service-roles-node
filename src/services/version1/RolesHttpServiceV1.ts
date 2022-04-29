import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class RolesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new Descriptor('service-roles', 'controller', 'default', '*', '1.0'));
    }
}