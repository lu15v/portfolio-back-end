const { createWriteStream} = require("fs");

const processUpload = async({createReadStream, filename, mimetype, encoding }) =>{
    const stream = createReadStream()

    const out = createWriteStream(process.cwd() +'/images/' + filename);
    new Promise((resolve, reject) =>
        stream.pipe(out)
            .on("finish", () => resolve())
            .on("error", reject)
    );
}

const UploadStringUrl = async(upload, path) =>{

    const {createReadStream, filename, mimetype, encoding } = await upload;
    await processUpload({createReadStream, filename, mimetype, encoding});

    return `${path}/images/${filename}`;
}


exports.processUpload = processUpload;
exports.UploadStringUrl = UploadStringUrl;