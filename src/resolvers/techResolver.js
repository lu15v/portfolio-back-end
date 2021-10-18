const { createWriteStream} = require("fs");
const {GraphQLUpload } = require('graphql-yoga');

const processUpload = async({createReadStream, filename, mimetype, encoding }) =>{
    const stream = createReadStream()

    const out = createWriteStream(process.cwd() +'/images/' + filename);
    new Promise((resolve, reject) =>
        stream.pipe(out)
            .on("finish", () => resolve())
            .on("error", reject)
    );
}

module.exports = {
    Query:{
        sayHi: () => "hi"
    },
    Upload: GraphQLUpload,
    Mutation:{
        uploadFile: async (parent, { file }) => {
            const {createReadStream, filename, mimetype, encoding } = await file;
            await processUpload({createReadStream, filename, mimetype, encoding });
            return true;
          }
    }
}