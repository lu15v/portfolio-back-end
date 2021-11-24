const { createWriteStream} = require("fs");
const {GraphQLUpload } = require('graphql-yoga');
const {UserInputError} = require('apollo-server-errors');
const {emptyValidator} = require('../util/validators');
const {UploadStringUrl} = require('../util/uploader');

const Tech = require('../models/tech');
const pictures_path = process.env.NODE_ENV === "production" ? "portfolio-graphql-be.herokuapp.com" : "localhost:5000";

module.exports = {
    Query:{
        getTech: async (_,{name}) => {
            const techExists = await Tech.findOne({name});

            if(!techExists){
                throw new Error(`Tech with name ${name} not found`)
            }
            return techExists
        },
    },
    Upload: GraphQLUpload,
    Mutation:{
        // uploadFile: async (parent, { file }) => {
        //     const {createReadStream, filename, mimetype, encoding } = await file;
        //     await processUpload({createReadStream, filename, mimetype, encoding });
        //     return true;
        //   },
          loadTech: async(parent, {input}) =>{
              const {name, logo, logo_dark_mode} = input;

            const errors = emptyValidator({name, logo});
            if(Object.keys(errors).length > 0){
                throw new UserInputError("Empty fields", {
                    errors: errors
                });
            }
            // if(name.trim() === ""){
            //     throw new UserInputError("Empty comment", {
            //         errors:{
            //             name: "Comment cannot be empty"
            //         }
            //     });
            // }

            const tech = await Tech.findOne({name});

            if(tech){
                throw new UserInputError('name is taken', {
                    errors:{
                        name: `${name} name is already in use`
                    }
                })
            }

            const isLogoDarkModePresent = logo_dark_mode !== undefined && logo_dark_mode !== '';

            const newTech = new Tech({
                name,
                logo: await UploadStringUrl(logo, pictures_path),
                logo_dark_mode: isLogoDarkModePresent ? await UploadStringUrl(logo_dark_mode, pictures_path) : await UploadStringUrl(logo, pictures_path)
            });
            
            const res = await newTech.save();
            
            return{
                ...res._doc,
                id: res._id
            }
           
          }
    }
}