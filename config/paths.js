const path = require('path');

module.exports = {

    // Source files
    src: path.resolve(__dirname, '../src'),
    src_rel: '../src',

    // Production build files
    dist: path.resolve(__dirname, '../dist'),
    dist_rel: '../dist',

    // Static files that get copied to build folder
    static: path.resolve(__dirname, '../static'),
    static_rel: '../static',

    assets_dir: 'static',

    distResolve: function (folder) {
        return path.posix.join('static', folder);
        /*
        return process.env.NODE_ENV === 'production'
            ? path.resolve(this.dist_rel, folder)
            : path.posix.join('static', folder);*/
        //return path.resolve(assetsDir, folder);
    },

    staticResolve: function (folder) {
        return path.posix.join('static', folder)
    },

    assetsPath: function (_path) {
        return path.posix.join(this.assets_dir, _path)
    }
};

//export default module.exports;