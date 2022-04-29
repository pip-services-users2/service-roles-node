import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesController } from './IRolesController';
export declare class RolesController implements IConfigurable, IReferenceable, ICommandable, IRolesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>>;
    getRolesById(correlationId: string, userId: string): Promise<string[]>;
    setRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    grantRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    revokeRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    authorize(correlationId: string, userId: string, roles: string[]): Promise<boolean>;
}
