var connection = require("../config/connection.js")
function printQuestionMarks(num){
    var arr = [];
    for (var i=0; i<num.length; i++){
        arr.push("?")
    }
    return arr.toString();
};

function objToSql(ob){
    var arr = [];
    for (var key in ob){
        if(Object.hasOwnProperty.call(ob.key)){
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
}

var orm = {
    all: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ");";
        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });

    },
    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, results){
            if (err){
                throw err;
            }
            cb(resuts);
        });
    },
    delete: function(table, condition, cb){
        var queryString = "DELETE FROM " + table + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, results){
            if (err){
                throw err;
            }
            cb(results);
        });
    }
};

module.exports = orm;