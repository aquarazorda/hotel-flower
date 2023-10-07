const fs = require('fs');

const files = fs.readdirSync('./images');

const sizes = [{
  name: 'mobile',
  width: '768'
}, {
  name: 'tablet',
  width: '1024'
}, {
  name: 'desktop',
  width: '1920'
}];

files.forEach((folderName: string) => {
  const fileNames = fs.readdirSync(`./images/${folderName}`);
  const roomNumber = folderName.split('-')[0];

  if (!fs.existsSync(`./public/img/${roomNumber}`)) {
    fs.mkdirSync(`./public/img/${roomNumber}`);
  }

  fileNames.forEach((fileName: string, index: number) => {
    sizes.forEach(({ name, width }) => {
      Bun.spawnSync([
        'cwebp', 
        `./images/${folderName}/${fileName}`, 
        '-o', `./public/img/${roomNumber}/${index}-${name}.webp`,
        '-resize', width, '0',
        '-q', '80',
        '-exact',
        '-metadata', 'all'
      ])
    })
  });
});