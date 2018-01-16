
requirejs.config({
    baseUrl: 'src',
    paths: {
        jquery: '../lib/jquery-1.12.4.min',
        core: 'core',
    }
});

requirejs(['jquery']);
requirejs(['core/base']);
requirejs(['main']);
