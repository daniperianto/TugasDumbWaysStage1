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
            const query = "SELECT p.id, p.author_id, p.title, p.start_date, p.end_date, p.description, p.technologies, p.image, u.username FROM projects p LEFT JOIN users u ON p.author_id = u.id"
            let allProjects = await sequelize.query(query, {type: QueryTypes.SELECT});
            this.dataProjectArray = [];
            allProjects.forEach( (project) => {
                this.dataProjectArray.unshift(new DataProject(project, project.author_id));
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

            console.log(technologies)

            await projects.create({
                title: dataProject.title,
                author_id: dataProject.author_id,
                start_date: dataProject.start_date,
                end_date: dataProject.end_date,
                description: dataProject.description,
                technologies: technologies,
                image: dataProject.image,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } catch (error) {
            console.log(error);
        }

    }

    async getDataProjectById(id) {
        try {
            const query = `SELECT p.id, p.author_id, p.title, p.start_date, p.end_date, p.description, p.technologies, p.image, u.username FROM projects p LEFT JOIN users u ON p.author_id = u.id WHERE p.id = ${id}`
            let project = await sequelize.query(query, {type: QueryTypes.SELECT});
            return new DataProject(project[0], project[0].author_id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDataProjectById(id) {
        try {
            const query = `DELETE FROM projects WHERE id = ${id}`;
            await sequelize.query(query, {type: QueryTypes.DELETE});
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
                author_id: dataProject.author_id,
                start_date: dataProject.start_date,
                end_date: dataProject.end_date,
                description: dataProject.description,
                technologies: technologies,
                image: dataProject.image,
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