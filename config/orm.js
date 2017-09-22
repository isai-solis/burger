var connection = require("../config/connection.js")
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
};

function objToSql(ob){
    var arr = [];
    for (var key in ob){
        if(Object.hasOwnProperty.call(ob, key)){
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
};

var orm = {
    selectAll: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ");";
        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });

    },
    updateOne: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, results){
            if (err){
                throw err;
            }
            cb(results);
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