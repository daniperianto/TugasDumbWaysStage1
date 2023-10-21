const config = require('../config/config.json');
const { Sequelize, QueryTypes, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const DataProject = require("./data-project");
const { query } = require('express');
const projects = require('../models/projects')(sequelize, DataTypes)


const DataProjectRepository = class {
    constructor() {}

    async findAll() {
        try {
            let allProjects = await projects.findAll();
            this.dataProjectArray = [];
            allProjects.forEach( (project) => {
                this.dataProjectArray.unshift(new DataProject(project));
            })
            return this.dataProjectArray;            
        } catch (error) {
            console.log(error);
        }
    }

    async addDataProject(dataProject) {
        try {
            let technologies = [];
            if (dataProject.node_js) technologies.push("node-js");
            if (dataProject.react_js) technologies.push("react-js");
            if (dataProject.next_js) technologies.push("next-js");
            if (dataProject.typescript) technologies.push("typescript");

            await projects.create({
                title: dataProject.title,
                start_date: dataProject.start_date,
                end_date: dataProject.end_date,
                description: dataProject.description,
                technologies: technologies,
                createdAt: new Date(),
                updatedAt: new Date()
            });


            // const query = `INSERT INTO projects (title, start_date, end_date, description, technologies, "createdAt", "updatedAt") VALUES (${dataProject.title}, ${dataProject.start_date}, ${dataProject.end_date}, ${dataProject.description}, ARRAY[${technologies}], NOW(), NOW())`;

            // await sequelize.query(query, {type: QueryTypes.INSERT});
        } catch (error) {
            console.log(error);
        }

    }

    async getDataProjectById(id) {
        try {
            let project = await projects.findByPk(id);
            return new DataProject(project);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDataProjectById(id) {
        try {
            await projects.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async editDataProjectById(id, dataProject) {
        try {
            let technologies = [];
            if (dataProject.node_js) technologies.push("node-js");
            if (dataProject.react_js) technologies.push("react-js");
            if (dataProject.next_js) technologies.push("next-js");
            if (dataProject.typescript) technologies.push("typescript");

            await projects.update({
                title: dataProject.title,
                start_date: dataProject.start_date,
                end_date: dataProject.end_date,
                description: dataProject.description,
                technologies: technologies,
                updatedAt: new Date()
            }, {
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DataProjectRepository;