var gulpConfig = function() {
    var src = './src/';
    var build = './build/';

    var config = {
        src: {
            js: src + 'main.js',
            template: src + '**/*.jade',
            sass: src + 'application.sass'
        },
        build: {
            js: build,
            css: build,
            html: build
        }
    };

    return config;
};

module.exports = gulpConfig();
