const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

async function removeBackground() {
    try {
        const inputPath = 'C:\\Users\\user\\.gemini\\tmp\\image_0.png';
        const outputPath = 'C:\\Projects\\TheVace\\frontend\\public\\assets\\images\\gorilla-logo.png';

        console.log('Loading image...');
        const image = await Jimp.read(inputPath);

        console.log('Removing light background colors...');
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // The background is a light grey/white gradient. 
            // We'll threshold it to remove light pixels.
            if (red > 200 && green > 200 && blue > 200) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
            }
        });

        console.log('Saving transparent image...');
        await image.writeAsync(outputPath);
        console.log('Success!');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

removeBackground();
