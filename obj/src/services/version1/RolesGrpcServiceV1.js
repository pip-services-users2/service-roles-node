"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGrpcServiceV1 = void 0;
let services = require('../../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../../src/protos/roles_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const RolesGrpcConverterV1_1 = require("./RolesGrpcConverterV1");
class RolesGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.RolesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-roles", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getRolesByFilter(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            RolesGrpcConverterV1_1.RolesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.RolesPageReply();
            try {
                let result = yield this._controller.getRolesByFilter(correlationId, filter, paging);
                let page = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromUserRolesPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getRolesById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let response = new messages.RolesReply();
            try {
                let result = yield this._controller.getRolesById(correlationId, userId);
                response.setRolesList(result);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    setRoles(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let roles = call.request.getRolesList();
            let response = new messages.RolesReply();
            try {
                let result = yield this._controller.setRoles(correlationId, userId, roles);
                if (result)
                    response.setRolesList(result);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    grantRoles(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let roles = call.request.getRolesList();
            let response = new messages.RolesReply();
            try {
                let result = yield this._controller.grantRoles(correlationId, userId, roles);
                if (result)
                    response.setRolesList(result);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    revokeRoles(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let roles = call.request.getRolesList();
            let response = new messages.RolesReply();
            try {
                let result = yield this._controller.revokeRoles(correlationId, userId, roles);
                if (result)
                    response.setRolesList(result);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    authorize(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let roles = call.request.getRolesList();
            let response = new messages.AuthorizeReply();
            try {
                let result = yield this._controller.authorize(correlationId, userId, roles);
                response.setAuthorized(result);
            }
            catch (err) {
                let error = RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_roles_by_filter', null, this.getRolesByFilter);
        this.registerMethod('get_roles_by_id', null, this.getRolesById);
        this.registerMethod('set_roles', null, this.setRoles);
        this.registerMethod('grant_roles', null, this.grantRoles);
        this.registerMethod('revoke_roles', null, this.revokeRoles);
        this.registerMethod('authorize', null, this.authorize);
    }
}
exports.RolesGrpcServiceV1 = RolesGrpcServiceV1;
//# sourceMappingURL=RolesGrpcServiceV1.js.map