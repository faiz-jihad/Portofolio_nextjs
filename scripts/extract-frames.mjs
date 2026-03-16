/**
 * Script to extract frames from an animated WebP file
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFilePath = path.join(__dirname, '..', 'sequence', 'Whisk_mjm0ywm2etykndoz0smmntotqgn1qtl3uzn50ym-ezgif.com-video-to-webp-converter.webp');
const outputDir = path.join(__dirname, '..', 'public', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extractFrames() {
  try {
    console.log('Starting frame extraction...');
    const image = sharp(inputFilePath, { animated: true });
    
    const metadata = await image.metadata();
    const frameCount = metadata.pages || 1;
    console.log(`Found ${frameCount} frames.`);

    for (let i = 0; i < frameCount; i++) {
        const frameIndexStr = String(i + 1).padStart(4, '0');
        const outputPath = path.join(outputDir, `${frameIndexStr}.webp`);

        await sharp(inputFilePath, { animated: true, page: i })
            .webp({ quality: 80 })
            .toFile(outputPath);
            
        console.log(`Saved frame ${frameIndexStr}`);
    }

    console.log('Extraction complete!');
  } catch (error) {
    console.error('Error extracting frames:', error);
  }
}

extractFrames();
