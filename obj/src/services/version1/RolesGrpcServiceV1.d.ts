import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class RolesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getRolesByFilter;
    private getRolesById;
    private setRoles;
    private grantRoles;
    private revokeRoles;
    private authorize;
    register(): void;
}
