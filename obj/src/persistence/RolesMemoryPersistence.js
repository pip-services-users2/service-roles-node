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
exports.RolesMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class RolesMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i2])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let exceptIds = filter.getAsObject('except_ids');
        let roles = filter.getAsObject('roles');
        let exceptRoles = filter.getAsObject('except_roles');
        // Process ids filter
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        // Process except ids filter
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (!Array.isArray(exceptIds))
            exceptIds = null;
        // Process roles filter
        if (typeof roles == 'string')
            roles = roles.split(',');
        if (!Array.isArray(roles))
            roles = null;
        // Process except roles filter
        if (typeof exceptRoles == 'string')
            exceptRoles = exceptRoles.split(',');
        if (!Array.isArray(exceptRoles))
            exceptRoles = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (exceptIds && exceptIds.indexOf(item.id) >= 0)
                return false;
            if (roles && !this.contains(roles, item.roles))
                return false;
            if (exceptRoles && this.contains(exceptRoles, item.roles))
                return false;
            return true;
        };
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
exports.RolesMemoryPersistence = RolesMemoryPersistence;
//# sourceMappingURL=RolesMemoryPersistence.js.map