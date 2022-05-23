import { GraphQLUpload, } from 'graphql-upload';
import { finished } from 'stream/promises';
import path from "path";
import  fs from "fs";

export const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent: any, { file }: any) => {
      // const { createReadStream, filename } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      // const stream = createReadStream();
      // const pathName = path.join(__dirname, '../../files/'+Date.now()+'_'+filename);
      // await stream.pipe(fs.createWriteStream(pathName));

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      // const out = require('fs').createWriteStream('local-file-output.txt');
      // stream.pipe(out);
      // await finished(out);
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
      const name = Date.now()+'_'+filename;
      const pathName = path.join(__dirname, `/public/images/${name}`);
      await stream.pipe(fs.createWriteStream(pathName));

      return { 
        photoURL: `http://localhost:4000/images/${name}`,
        filename,
      }
    },
  },
};
