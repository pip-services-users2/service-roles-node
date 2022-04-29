import { ConfigParams } from 'pip-services3-commons-nodex';

import { RolesFilePersistence } from '../../src/persistence/RolesFilePersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesFilePersistence', ()=> {
    let persistence: RolesFilePersistence;
    let fixture: RolesPersistenceFixture;
    
    setup(async () => {
        persistence = new RolesFilePersistence('./data/roles.test.json');

        fixture = new RolesPersistenceFixture(persistence);
        
        await persistence.open(null)
        await persistence.clear(null);;
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('Get and Set Roles', async () => {
        await fixture.testGetAndSetRoles();
    });
});