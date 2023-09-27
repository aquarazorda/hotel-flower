import { Plugin } from 'vite';
import { readdirSync } from 'fs';

export default function generateImageCountPlugin(): Plugin {
  return {
    name: 'generate-image-count',
    buildStart() {
      const folders = readdirSync('./public/img');
      
      const counts = folders.reduce((acc, folder) => {
        if (folder.includes("imageCounts")) return acc;
        const files = readdirSync(`./public/img/${folder}`).sort((a, b) => {
          return Number(a.split("-")[0]) - Number(b.split("-")[0]);
        });
    
        acc[folder] = Number(files[files.length - 1].split("-")[0]);
        return acc;
      }, {} as Record<string, number>);

      // Export the counts variable to a JavaScript module
      const imageCounts = JSON.stringify(counts, null, 2);
      
      // Write the generated module to a file (e.g., counts.js)
      this.emitFile({
        type: 'asset',
        fileName: 'img/imageCounts.json',
        source: imageCounts,
      });
    },
  };
}
