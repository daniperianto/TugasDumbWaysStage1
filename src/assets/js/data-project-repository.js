const DataProjectRepository = class {
    constructor() {
        this.dataProjectArray = [];
    }

    findAll() {
        return JSON.parse(JSON.stringify(this.dataProjectArray));
    }

    addDataProject(dataProject) {
        this.dataProjectArray.unshift(dataProject);
    }

    getDataProjectById(id) {
        return JSON.parse(JSON.stringify(this.dataProjectArray[id]));
    }

    deleteDataProjectById(id) {
        this.dataProjectArray.splice(id, 1);
    }

    editDataProjectById(id, dataProject) {
        this.dataProjectArray[id] = dataProject;
    }
}

module.exports = DataProjectRepository;