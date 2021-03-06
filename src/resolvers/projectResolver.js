const Project = require('../models/project');
const Tech = require('../models/tech');
const {emptyValidator} = require('../util/validators');
const {UserInputError} = require('apollo-server-errors');
const {UploadStringUrl} = require('../util/uploader');

const pictures_path = process.env.NODE_ENV === "production" ? "portfolio-graphql-be.herokuapp.com" : "localhost:5000";



module.exports = {
    Query:{
        getProject: async (_, {name}) =>{
            const projectExists = await Project.findOne({name}).populate('stack');

            if(!projectExists){
                throw new Error(`Tech with name ${name} not found`);
            }
            return projectExists
        },
        getProjects: async() =>{
            const projects = await Project.find().sort({createdAt: -1}).populate('stack');
            return projects;
        },
        getNProjects: async(_, {first, next}) =>{
            let limit, skip;

            if(first === undefined){
                limit = 2;
            }else{
                limit = first;
            }

            if(next === undefined){
                skip = 0;
            }else{
                skip = next;
            }
            
            const totalProjects = await Project.find().count();

            if(first > totalProjects){
                throw new UserInputError('first cannot be greater than the total projects', {
                    error: "Trying to fetch more docs than available. First " + first
                })
            }else if(first * next > totalProjects){
                throw new UserInputError('cannot skip more values than available', {
                    error: "Trying to skip more docs than available. First " + first + " next " + next
                })
            }
            
            const projects = await Project.find().sort({createdAt: -1}).limit(limit).skip(skip * limit).populate('stack');
            return projects;
        }
    },
    Mutation:{
            loadProject: async(parent, {input}) =>{
                const {name, description, prevProject, nextProject, coverPagePicture,
                       mainPicture, pictureName, gitRepo, demo, stack} =  await input;
                       
                const errors = emptyValidator({name, description, prevProject, nextProject, coverPagePicture,
                                            mainPicture, pictureName, gitRepo, stack});

                if(Object.keys(errors).length > 0){
                    throw new UserInputError('empty fields', {
                        errors: errors
                    })
                }
                

                const project = await Project.findOne({name});

                if(project){
                    throw new UserInputError('name is taken', {
                        errors:{
                            name: `${name} name is already in use`
                        }
                    })
                }

                let techs = [];

                for(let i = 0; i < stack.length; i++){
                    const techName = stack[i]
                    const currTech = await Tech.findOne({name: techName});
                    if(currTech) techs.push(currTech);
                }

                const newProject = new Project({
                    name,
                    description,
                    prevProject,
                    nextProject,
                    coverPagePicture: await UploadStringUrl(coverPagePicture, pictures_path),
                    mainPicture: await UploadStringUrl(mainPicture, pictures_path),
                    pictureName: await UploadStringUrl(pictureName, pictures_path),
                    demo,
                    gitRepo,
                    stack: techs
                })

                const res = await newProject.save();
                return{
                    ...res._doc,
                    id: res._id
                }
        }
    }
}