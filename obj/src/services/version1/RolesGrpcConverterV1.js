"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGrpcConverterV1 = void 0;
let messages = require('../../../../src/protos/roles_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
class RolesGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_4.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        RolesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: RolesGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }
    static getMap(map) {
        let values = {};
        RolesGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromUserRoles(userRoles) {
        if (userRoles == null)
            return null;
        let obj = new messages.UserRoles();
        obj.setId(userRoles.id);
        obj.setUpdateTime(pip_services3_commons_nodex_2.StringConverter.toString(userRoles.update_time));
        obj.setRolesList(userRoles.roles);
        return obj;
    }
    static toUserRoles(obj) {
        if (obj == null)
            return null;
        let userRoles = {
            id: obj.getId(),
            update_time: pip_services3_commons_nodex_3.DateTimeConverter.toDateTime(obj.getUpdateTime()),
            roles: obj.getRolesList()
        };
        return userRoles;
    }
    static fromUserRolesPage(page) {
        if (page == null)
            return null;
        let obj = new messages.UserRolesPage();
        obj.setTotal(page.total);
        let data = page.data.map(RolesGrpcConverterV1.fromUserRoles);
        obj.setDataList(data);
        return obj;
    }
    static toUserRolesPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(RolesGrpcConverterV1.toUserRoles);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.RolesGrpcConverterV1 = RolesGrpcConverterV1;
//# sourceMappingURL=RolesGrpcConverterV1.js.map