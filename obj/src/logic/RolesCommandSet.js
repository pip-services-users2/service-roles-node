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
exports.RolesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_9 = require("pip-services3-commons-nodex");
class RolesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRolesByFilterCommand());
        this.addCommand(this.makeGetRolesByIdCommand());
        this.addCommand(this.makeSetRolesCommand());
        this.addCommand(this.makeGrantRolesCommand());
        this.addCommand(this.makeRevokeRolesCommand());
        this.addCommand(this.makeAuthorizeCommand());
    }
    makeGetRolesByFilterCommand() {
        return new pip_services3_commons_nodex_2.Command("get_roles_by_filter", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_9.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getRolesByFilter(correlationId, filter, paging);
        }));
    }
    makeGetRolesByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_roles_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_7.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            return yield this._logic.getRolesById(correlationId, userId);
        }));
    }
    makeSetRolesCommand() {
        return new pip_services3_commons_nodex_2.Command("set_roles", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_7.TypeCode.String)
            .withRequiredProperty('roles', new pip_services3_commons_nodex_6.ArraySchema(pip_services3_commons_nodex_7.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            return yield this._logic.setRoles(correlationId, userId, roles);
        }));
    }
    makeGrantRolesCommand() {
        return new pip_services3_commons_nodex_2.Command("grant_roles", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_7.TypeCode.String)
            .withRequiredProperty('roles', new pip_services3_commons_nodex_6.ArraySchema(pip_services3_commons_nodex_7.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            return yield this._logic.grantRoles(correlationId, userId, roles);
        }));
    }
    makeRevokeRolesCommand() {
        return new pip_services3_commons_nodex_2.Command("revoke_roles", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_7.TypeCode.String)
            .withRequiredProperty('roles', new pip_services3_commons_nodex_6.ArraySchema(pip_services3_commons_nodex_7.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            return yield this._logic.revokeRoles(correlationId, userId, roles);
        }));
    }
    makeAuthorizeCommand() {
        return new pip_services3_commons_nodex_2.Command("authorize", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_7.TypeCode.String)
            .withRequiredProperty('roles', new pip_services3_commons_nodex_6.ArraySchema(pip_services3_commons_nodex_7.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            let roles = args.getAsArray("roles");
            return yield this._logic.authorize(correlationId, userId, roles);
        }));
    }
}
exports.RolesCommandSet = RolesCommandSet;
//# sourceMappingURL=RolesCommandSet.js.map