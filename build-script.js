const fs = require('fs-extra');
const concat = require('concat');    

(async function build() {

    const files =[
        
        './dist/scripts.js',
        './dist/main.js'
    ]
    
    await fs.ensureDir('elements')
    
    await concat(files, 'elements/user-poll.js')
    console.info('Elements created successfully!')

})()