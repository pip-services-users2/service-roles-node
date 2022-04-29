import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { RolesMongoDbPersistence } from '../persistence/RolesMongoDbPersistence';
import { RolesFilePersistence } from '../persistence/RolesFilePersistence';
import { RolesMemoryPersistence } from '../persistence/RolesMemoryPersistence';
import { RolesController } from '../logic/RolesController';
import { RolesHttpServiceV1 } from '../services/version1/RolesHttpServiceV1';
import { RolesCommandableGrpcServiceV1 } from '../services/version1/RolesCommandableGrpcServiceV1';
import { RolesGrpcServiceV1 } from '../services/version1/RolesGrpcServiceV1';

export class RolesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-roles", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-roles", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-roles", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-roles", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-roles", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-roles", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-roles", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-roles", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RolesServiceFactory.MemoryPersistenceDescriptor, RolesMemoryPersistence);
		this.registerAsType(RolesServiceFactory.FilePersistenceDescriptor, RolesFilePersistence);
		this.registerAsType(RolesServiceFactory.MongoDbPersistenceDescriptor, RolesMongoDbPersistence);
		this.registerAsType(RolesServiceFactory.ControllerDescriptor, RolesController);
		this.registerAsType(RolesServiceFactory.HttpServiceDescriptor, RolesHttpServiceV1);
		this.registerAsType(RolesServiceFactory.CommandableGrpcServiceDescriptor, RolesCommandableGrpcServiceV1);
		this.registerAsType(RolesServiceFactory.GrpcServiceDescriptor, RolesGrpcServiceV1);
	}
	
}
