const path = require('path');
const glob = require("glob");

function getEntry(globPath,options={}){
    var files = glob.sync(globPath,options);
    var entries = {},entry,dirname,basename,extname;

    for(var i=0; i<files.length; i++){
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry,extname);
        entries[basename] = './'+entry;
    }
    return entries;
}
module.exports = {
    entry: Object.assign({
      'tpl': path.join(__dirname, 'frontend/modules', 'index.js'),
    }),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: (data) => {
            // console.log(data.chunk.entryModule);
            return 'modules/[name].tpl.js';
        }
    },
    watch: true,
    module: {
        rules: [
            { test: /\.art$/, use: 'art-template-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    }
}