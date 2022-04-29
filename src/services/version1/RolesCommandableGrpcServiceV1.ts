import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class RolesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/roles');
        this._dependencyResolver.put('controller', new Descriptor('service-roles', 'controller', 'default', '*', '*'));
    }
}