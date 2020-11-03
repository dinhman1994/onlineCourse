'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "ReportHistories", deps: []
 * createTable "Admins", deps: []
 * createTable "CategoriesOfCourse", deps: []
 * createTable "Courses", deps: []
 * createTable "Documents", deps: []
 * createTable "EnrollHistories", deps: []
 * createTable "Categories", deps: []
 * createTable "Supervisors", deps: []
 * createTable "TasksInEnroll", deps: []
 * createTable "TasksOfCourse", deps: []
 * createTable "Trainees", deps: []
 * createTable "Users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2020-10-15T19:50:18.334Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "ReportHistories",
                {
                    "reportHistoryId": {
                        "type": Sequelize.INTEGER,
                        "field": "reportHistoryId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "reportContent": {
                        "type": Sequelize.STRING(80),
                        "field": "reportContent"
                    },
                    "timeWrite": {
                        "type": Sequelize.DATE,
                        "field": "timeWrite",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Admins",
                {
                    "adminId": {
                        "type": Sequelize.INTEGER,
                        "field": "adminId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "CategoriesOfCourse",
                {
                    "cateOfCourseId": {
                        "type": Sequelize.INTEGER,
                        "field": "cateOfCourseId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Courses",
                {
                    "courseId": {
                        "type": Sequelize.INTEGER,
                        "field": "courseId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "timeOfCourse": {
                        "type": Sequelize.INTEGER,
                        "field": "timeOfCourse",
                        "defaultValue": 0,
                        "allowNull": false
                    },
                    "overView": {
                        "type": Sequelize.TEXT,
                        "field": "overView",
                        "defaultValue": "",
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.TEXT,
                        "field": "name",
                        "defaultValue": "",
                        "allowNull": false
                    },
                    "createDay": {
                        "type": Sequelize.DATE,
                        "field": "createDay",
                        "allowNull": false
                    },
                    "statusCourse": {
                        "type": Sequelize.ENUM('private', 'public'),
                        "field": "statusCourse",
                        "defaultValue": "private"
                    },
                    "typeOfCourse": {
                        "type": Sequelize.ENUM('free', 'limited'),
                        "field": "typeOfCourse",
                        "defaultValue": "limited"
                    },
                    "secretKey": {
                        "type": Sequelize.STRING,
                        "field": "secretKey",
                        "defaultValue": ""
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Documents",
                {
                    "documentId": {
                        "type": Sequelize.INTEGER,
                        "field": "documentId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "type": {
                        "type": Sequelize.ENUM('file', 'img', 'pdf'),
                        "field": "type",
                        "defaultValue": "pdf"
                    },
                    "path": {
                        "type": Sequelize.STRING,
                        "field": "path",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "EnrollHistories",
                {
                    "enrollHistoryId": {
                        "type": Sequelize.INTEGER,
                        "field": "enrollHistoryId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "process": {
                        "type": Sequelize.DOUBLE,
                        "field": "process",
                        "defaultValue": 0,
                        "allowNull": false
                    },
                    "startDay": {
                        "type": Sequelize.DATE,
                        "field": "startDay",
                        "allowNull": false
                    },
                    "endDay": {
                        "type": Sequelize.DATE,
                        "field": "endDay",
                        "allowNull": false
                    },
                    "statusEnroll": {
                        "type": Sequelize.BOOLEAN,
                        "field": "statusEnroll",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Categories",
                {
                    "categoryId": {
                        "type": Sequelize.INTEGER,
                        "field": "categoryId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "categoryName": {
                        "type": Sequelize.STRING,
                        "field": "categoryName",
                        "unique": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Supervisors",
                {
                    "supervisorId": {
                        "type": Sequelize.INTEGER,
                        "field": "supervisorId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "TasksInEnroll",
                {
                    "taskInEnrollId": {
                        "type": Sequelize.INTEGER,
                        "field": "taskInEnrollId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.BOOLEAN,
                        "field": "status",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "result": {
                        "type": Sequelize.BOOLEAN,
                        "field": "result"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "TasksOfCourse",
                {
                    "taskId": {
                        "type": Sequelize.INTEGER,
                        "field": "taskId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "question": {
                        "type": Sequelize.STRING,
                        "field": "question",
                        "unique": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Trainees",
                {
                    "traineeId": {
                        "type": Sequelize.INTEGER,
                        "field": "traineeId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "statusBlock": {
                        "type": Sequelize.BOOLEAN,
                        "field": "statusBlock",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Users",
                {
                    "userId": {
                        "type": Sequelize.INTEGER,
                        "field": "userId",
                        "primaryKey": true,
                        "unique": true,
                        "autoIncrement": true,
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "isEmail": true,
                        "unique": true,
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false,
                        "len": [2, 15]
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "defaultValue": ""
                    },
                    "tel": {
                        "type": Sequelize.BIGINT(10),
                        "field": "tel",
                        "allowNull": false
                    },
                    "birthday": {
                        "type": Sequelize.DATE,
                        "field": "birthday",
                        "allowNull": false
                    },
                    "userType": {
                        "type": Sequelize.ENUM('trainee', 'supervisor', 'admin'),
                        "field": "userType",
                        "defaultValue": "trainee"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt"
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["ReportHistories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Admins", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["CategoriesOfCourse", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Courses", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Documents", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["EnrollHistories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Categories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Supervisors", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["TasksInEnroll", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["TasksOfCourse", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Trainees", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
