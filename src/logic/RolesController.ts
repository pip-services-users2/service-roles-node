import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';

import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { UserRolesV1 } from '../data/version1/UserRolesV1';
import { IRolesPersistence } from '../persistence/IRolesPersistence';
import { IRolesController } from './IRolesController';
import { RolesCommandSet } from './RolesCommandSet';

export class RolesController implements IConfigurable, IReferenceable, ICommandable, IRolesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-roles:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(RolesController._defaultConfig);
    private _persistence: IRolesPersistence;
    private _commandSet: RolesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IRolesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RolesCommandSet(this);
        return this._commandSet;
    }

    public async getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }
    
    public async getRolesById(correlationId: string, userId: string): Promise<string[]> {
        let roles = await this._persistence.getOneById(correlationId, userId);
        return roles ? roles.roles : null;
    }

    public async setRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {
        let item = new UserRolesV1(userId, roles);
        let userRoles = await this._persistence.set(correlationId, item);

        return userRoles ? userRoles.roles : null;
    }

    public async grantRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {
        // If there are no roles then skip processing
        if (roles.length == 0) return;
        
        let existingRoles = await this.getRolesById(correlationId, userId);

        existingRoles ??= [];
        roles ??= [];

        let newRoles = existingRoles.filter(r => !roles.includes(r));
        newRoles.push(...roles);
        newRoles = [...new Set(newRoles)];

        return await this.setRoles(
            correlationId,
            userId,
            newRoles
        )
    }

    public async revokeRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {
        // If there are no roles then skip processing
        if (roles.length == 0) return;

        let existingRoles = await this.getRolesById(correlationId, userId);

        existingRoles ??= [];
        roles ??= [];
        
        let newRoles = existingRoles.filter(r => !roles.includes(r));

        return await this.setRoles(
            correlationId,
            userId,
            newRoles
        );
    }
    
    public async authorize(correlationId: string, userId: string, roles: string[]): Promise<boolean> {
        // If there are no roles then skip processing
        if (roles.length == 0) return;

        let existingRoles = await this.getRolesById(correlationId, userId);
        
        let authorized = true;

        for (let role of roles) {
            let exist = existingRoles.includes(role);
            if (!exist) {
                authorized = false;
                break;
            }
        }
        return authorized;
    }
        
}
