const { readFile, writeFile } = require('fs');

const util = require('util');
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);


const startTask = async () => {
  try {
    const first = await readFilePromise('./content/first.txt', 'utf8')
    console.log(first);

    const second = await readFilePromise('./content/second.txt', 'utf8')
    console.log(second);

    await writeFilePromise('./content/result-sync-await.txt', `result from writeFileSync: ${first} ${second}`)

  } catch (error) { console.log(error); }




}

startTask()

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => { if (err) { reject(err) } else { resolve(data) } })

//     })
// }
// getText('./content/first.txt').then((result) => console.log(result))