import { RolesMemoryPersistence } from '../../src/persistence/RolesMemoryPersistence';
import { RolesPersistenceFixture } from './RolesPersistenceFixture';

suite('RolesMemoryPersistence', ()=> {
    let persistence: RolesMemoryPersistence;
    let fixture: RolesPersistenceFixture;
    
    setup(async () => {
        persistence = new RolesMemoryPersistence();
        fixture = new RolesPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('Get and Set Roles', async () => {
        await fixture.testGetAndSetRoles();
    });

});