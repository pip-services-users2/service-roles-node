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
exports.RolesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const UserRolesV1_1 = require("../data/version1/UserRolesV1");
const RolesCommandSet_1 = require("./RolesCommandSet");
class RolesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(RolesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RolesCommandSet_1.RolesCommandSet(this);
        return this._commandSet;
    }
    getRolesByFilter(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRolesById(correlationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let roles = yield this._persistence.getOneById(correlationId, userId);
            return roles ? roles.roles : null;
        });
    }
    setRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = new UserRolesV1_1.UserRolesV1(userId, roles);
            let userRoles = yield this._persistence.set(correlationId, item);
            return userRoles ? userRoles.roles : null;
        });
    }
    grantRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0)
                return;
            let existingRoles = yield this.getRolesById(correlationId, userId);
            existingRoles !== null && existingRoles !== void 0 ? existingRoles : (existingRoles = []);
            roles !== null && roles !== void 0 ? roles : (roles = []);
            let newRoles = existingRoles.filter(r => !roles.includes(r));
            newRoles.push(...roles);
            newRoles = [...new Set(newRoles)];
            return yield this.setRoles(correlationId, userId, newRoles);
        });
    }
    revokeRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0)
                return;
            let existingRoles = yield this.getRolesById(correlationId, userId);
            existingRoles !== null && existingRoles !== void 0 ? existingRoles : (existingRoles = []);
            roles !== null && roles !== void 0 ? roles : (roles = []);
            let newRoles = existingRoles.filter(r => !roles.includes(r));
            return yield this.setRoles(correlationId, userId, newRoles);
        });
    }
    authorize(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0)
                return;
            let existingRoles = yield this.getRolesById(correlationId, userId);
            let authorized = true;
            for (let role of roles) {
                let exist = existingRoles.includes(role);
                if (!exist) {
                    authorized = false;
                    break;
                }
            }
            return authorized;
        });
    }
}
exports.RolesController = RolesController;
RolesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-roles:persistence:*:*:1.0');
//# sourceMappingURL=RolesController.js.map