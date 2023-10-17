const config = require('../config/config.json');
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const DataProject = require("./data-project");


const DataProjectRepository = class {
    constructor() {
        this.dataProjectArray = [];
    }

    async findAll() {
        try {
            const query = `SELECT * FROM projects`;
            let allProjects = await sequelize.query(query, {type: QueryTypes.SELECT});
            this.dataProjectArray = [];
            allProjects.forEach( (project) => {
                this.dataProjectArray.unshift(new DataProject(project));
            })
            return this.dataProjectArray;            
        } catch (error) {
            console.log(error);
        }
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