let services = require('../../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../../src/protos/roles_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IRolesController } from '../../logic/IRolesController';
import { RolesGrpcConverterV1 } from './RolesGrpcConverterV1';

export class RolesGrpcServiceV1 extends GrpcService {
    private _controller: IRolesController;
	
    public constructor() {
        super(services.RolesService);
        this._dependencyResolver.put('controller', new Descriptor("service-roles", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IRolesController>('controller');
    }
    
    private async getRolesByFilter(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        RolesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = RolesGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.RolesPageReply();
        try {
            let result = await this._controller.getRolesByFilter(correlationId, filter, paging);
            let page = RolesGrpcConverterV1.fromUserRolesPage(result);
            response.setPage(page);
        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async getRolesById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        let response = new messages.RolesReply();
        try {
            let result = await this._controller.getRolesById(correlationId, userId);
            response.setRolesList(result);
        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async setRoles(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        let response = new messages.RolesReply();
        try {
            let result = await this._controller.setRoles(correlationId, userId, roles);
            if (result)
                response.setRolesList(result);
        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async grantRoles(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        let response = new messages.RolesReply();
        try {
            let result = await this._controller.grantRoles(correlationId, userId, roles);
            if (result)
                response.setRolesList(result);

        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async revokeRoles(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        let response = new messages.RolesReply();
        try {
            let result = await this._controller.revokeRoles(correlationId, userId, roles);
            if (result)
                response.setRolesList(result);
        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async authorize(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let roles = call.request.getRolesList();

        let response = new messages.AuthorizeReply();
        try {
            let result = await this._controller.authorize(correlationId, userId, roles)
            response.setAuthorized(result);
        } catch (err) {
            let error = RolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }
        
    public register() {
        this.registerMethod(
            'get_roles_by_filter', 
            null,
            this.getRolesByFilter
        );

        this.registerMethod(
            'get_roles_by_id', 
            null,
            this.getRolesById
        );

        this.registerMethod(
            'set_roles', 
            null,
            this.setRoles
        );

        this.registerMethod(
            'grant_roles', 
            null,
            this.grantRoles
        );

        this.registerMethod(
            'revoke_roles', 
            null,
            this.revokeRoles
        );

        this.registerMethod(
            'authorize', 
            null,
            this.authorize
        );
    }
}
