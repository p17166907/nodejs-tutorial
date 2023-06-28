const { readFile, writeFile } = require('fs');

console.log('start task');

readFile('./content/first.txt', 'utf8', (err, first) => {
  if (err) { console.log(err); return; }
  console.log(first);

  readFile('./content/second.txt', 'utf8', (err, second) => {
    if (err) { console.log(err); return; }
    console.log(second);

    writeFile('./content/result-async.txt', `Here is the result: ${first}, ${second}`, (err) => {
      if (err) { console.log(err); return; }
      console.log('done with this task');
    });
  });
});

console.log('starting next task');
