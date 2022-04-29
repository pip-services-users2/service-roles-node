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
exports.RolesMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class RolesMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('user_roles');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (Array.isArray(exceptIds))
            criteria.push({ _id: { $nin: exceptIds } });
        // Filter roles
        let roles = filter.getAsObject('roles');
        if (typeof roles == 'string')
            roles = roles.split(',');
        if (Array.isArray(roles))
            criteria.push({ roles: { $in: roles } });
        // Filter except roles
        let exceptRoles = filter.getAsObject('except_roles');
        if (typeof exceptRoles == 'string')
            exceptRoles = exceptRoles.split(',');
        if (Array.isArray(exceptRoles))
            criteria.push({ roles: { $nin: exceptRoles } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    set(correlationId, item) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null)
                return;
            item = Object.assign({}, item);
            item.update_time = new Date();
            return yield _super.set.call(this, correlationId, item);
        });
    }
}
exports.RolesMongoDbPersistence = RolesMongoDbPersistence;
//# sourceMappingURL=RolesMongoDbPersistence.js.map