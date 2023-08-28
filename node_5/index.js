import { cp } from 'node:fs/promises';


const app = async (sourceDir, targetDir) => {
  try {
    await cp(sourceDir, targetDir, { recursive: true });

    console.log(
      'Исходная папка рекурсивно копируется в пункт назначения'
    );
  } catch (err) {
    console.error(err.message);
  }
};

app('./copyFromHere', './copyToHere');
