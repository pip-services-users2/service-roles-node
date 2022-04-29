"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const RolesMongoDbPersistence_1 = require("../persistence/RolesMongoDbPersistence");
const RolesFilePersistence_1 = require("../persistence/RolesFilePersistence");
const RolesMemoryPersistence_1 = require("../persistence/RolesMemoryPersistence");
const RolesController_1 = require("../logic/RolesController");
const RolesHttpServiceV1_1 = require("../services/version1/RolesHttpServiceV1");
const RolesCommandableGrpcServiceV1_1 = require("../services/version1/RolesCommandableGrpcServiceV1");
const RolesGrpcServiceV1_1 = require("../services/version1/RolesGrpcServiceV1");
class RolesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(RolesServiceFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence_1.RolesMemoryPersistence);
        this.registerAsType(RolesServiceFactory.FilePersistenceDescriptor, RolesFilePersistence_1.RolesFilePersistence);
        this.registerAsType(RolesServiceFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence_1.RolesMongoDbPersistence);
        this.registerAsType(RolesServiceFactory.ControllerDescriptor, RolesController_1.RolesController);
        this.registerAsType(RolesServiceFactory.HttpServiceDescriptor, RolesHttpServiceV1_1.RolesHttpServiceV1);
        this.registerAsType(RolesServiceFactory.CommandableGrpcServiceDescriptor, RolesCommandableGrpcServiceV1_1.RolesCommandableGrpcServiceV1);
        this.registerAsType(RolesServiceFactory.GrpcServiceDescriptor, RolesGrpcServiceV1_1.RolesGrpcServiceV1);
    }
}
exports.RolesServiceFactory = RolesServiceFactory;
RolesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "factory", "default", "default", "1.0");
RolesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "persistence", "memory", "*", "1.0");
RolesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "persistence", "file", "*", "1.0");
RolesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "persistence", "mongodb", "*", "1.0");
RolesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "controller", "default", "*", "1.0");
RolesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "service", "http", "*", "1.0");
RolesServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "service", "commandable-grpc", "*", "1.0");
RolesServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-roles", "service", "grpc", "*", "1.0");
//# sourceMappingURL=RolesServiceFactory.js.map