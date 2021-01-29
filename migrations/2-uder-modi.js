'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Clinics", deps: []
 * createTable "Slots", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "uder-modi",
    "created": "2021-01-29T16:01:43.203Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Clinics",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Slots",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
