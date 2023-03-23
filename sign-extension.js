const fs = require('fs');
const path = require('path');
const CRX = require('crx');

async function main() {
    const privateKeyPEM = process.env.CHROME_EXTENSION_SIGNING_PRIVATE_KEY;

    if (!privateKeyPEM) {
        throw new Error('Environment variable CHROME_EXTENSION_SIGNING_PRIVATE_KEY is not set');
    }

    const crx = new CRX({ privateKey: privateKeyPEM });
    const extensionPath = path.join(__dirname, 'dist');
    const outputPath = path.join(__dirname, 'dist', 'extension.crx');

    crx.load(extensionPath)
        .then(() => crx.pack())
        .then(crxBuffer => {
            fs.writeFileSync(outputPath, crxBuffer);
            console.log('Signed .crx file created at:', outputPath);
        })
        .catch(err => console.error('Signing error:', err));
}

main().catch(err => console.error(err));
