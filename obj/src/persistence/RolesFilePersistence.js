"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const RolesMemoryPersistence_1 = require("./RolesMemoryPersistence");
class RolesFilePersistence extends RolesMemoryPersistence_1.RolesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.RolesFilePersistence = RolesFilePersistence;
//# sourceMappingURL=RolesFilePersistence.js.map