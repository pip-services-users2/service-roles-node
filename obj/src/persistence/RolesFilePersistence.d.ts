import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { RolesMemoryPersistence } from './RolesMemoryPersistence';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
export declare class RolesFilePersistence extends RolesMemoryPersistence {
    protected _persister: JsonFilePersister<UserRolesV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
