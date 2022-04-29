import { ProcessContainer } from 'pip-services3-container-nodex';

import { RolesServiceFactory } from '../build/RolesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class RolesProcess extends ProcessContainer {

    public constructor() {
        super("roles", "User roles microservice");
        this._factories.add(new RolesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
