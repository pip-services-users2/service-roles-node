import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { IRolesController } from './IRolesController';

export class RolesCommandSet extends CommandSet {
    private _logic: IRolesController;

    constructor(logic: IRolesController) {
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

	private makeGetRolesByFilterCommand(): ICommand {
		return new Command(
			"get_roles_by_filter",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getRolesByFilter(correlationId, filter, paging);
            }
		);
	}

	private makeGetRolesByIdCommand(): ICommand {
		return new Command(
			"get_roles_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let userId = args.getAsNullableString("user_id");
                return await this._logic.getRolesById(correlationId, userId);
            }
		);
	}

	private makeSetRolesCommand(): ICommand {
		return new Command(
			"set_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                return await this._logic.setRoles(correlationId, userId, roles);
            }
		);
	}

	private makeGrantRolesCommand(): ICommand {
		return new Command(
			"grant_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                return await this._logic.grantRoles(correlationId, userId, roles);
            }
		);
	}

	private makeRevokeRolesCommand(): ICommand {
		return new Command(
			"revoke_roles",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                return await this._logic.revokeRoles(correlationId, userId, roles);
            }
		);
	}

	private makeAuthorizeCommand(): ICommand {
		return new Command(
			"authorize",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('roles', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
                let userId = args.getAsNullableString("user_id");
                let roles = args.getAsArray("roles");
                return await this._logic.authorize(correlationId, userId, roles);
            }
		);
	}

}