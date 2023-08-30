import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

const mergeTxtFiles = (sourceDirectory, outputTitle) => {
  const writeStream = createWriteStream(
    `${path.dirname(sourceDirectory)}/${outputTitle}.txt`,
  );

  writeStream.setDefaultEncoding('utf8');

  readdir(sourceDirectory)
    .then(async files => {
      for await (const file of files) {
        const extension = path.extname(file);

        if (extension === '.txt') {
          const readStream = createReadStream(`${sourceDirectory}/${file}`);
          writeStream.write(`[${file}]\n`);

          for await (const chunk of readStream) {
            writeStream.write(chunk);
          }
        }
      }
    })
    .catch(err => {
      console.log('Упс', err.message);
    });
};

mergeTxtFiles('./index2', 'result');
