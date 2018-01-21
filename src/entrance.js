requirejs.config({
    baseUrl: 'src',
    paths: {
        jquery: '../lib/jquery-1.12.4.min',
        core: 'core',
        comp: 'comp',
        action: 'comp/action',
        skill: 'comp/skill',
        entity: 'comp/entity',
        util: 'comp/util',
    },
});

requirejs(['jquery']);
requirejs(['core/base']);
requirejs(['main']);
