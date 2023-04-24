"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mssql_1 = require("mssql");
var sql = require("mssql");
var mongodb_1 = require("mongodb");
var pool = new mssql_1.ConnectionPool({
    user: 'nodeJs',
    password: 'Itktr234',
    server: 'localhost',
    database: 'myTest',
    options: {
        trustServerCertificate: true
    }
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .query("\n            CREATE TABLE users(\n                id CHAR(24) PRIMARY KEY,\n                login VARCHAR(50) UNIQUE NOT NULL,\n                password VARCHAR(50) NOT NULL,\n                );\n            ")];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function dropeUsersTable() {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .query("\n            DROP TABLE users;\n            ")];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function addUser(login, password) {
    return __awaiter(this, void 0, void 0, function () {
        var result, id, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .input('id', sql.Char(24), new mongodb_1.ObjectId().toString())
                            .input('login', sql.VarChar(50), login)
                            .input('password', sql.VarChar(50), password)
                            .output('insertedId', sql.Int)
                            .query("INSERT INTO users (id,login, password) OUTPUT INSERTED.id AS id VALUES (@id,@login, @password)")];
                case 2:
                    result = _a.sent();
                    id = result.recordset[0].id;
                    console.log(result.recordset[0]);
                    console.log("ObjectId.isValid(id):", mongodb_1.ObjectId.isValid(id));
                    return [2 /*return*/, result.recordset[0]];
                case 3:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .input('id', sql.Char(24), id)
                            .query('select * from users where id = @id')];
                case 2:
                    result = _a.sent();
                    console.log(result.recordset[0]);
                    return [2 /*return*/, result.recordset[0]];
                case 3:
                    err_4 = _a.sent();
                    console.error(err_4);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUsersProcedure(procedure) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            // .input('login', sql.VarChar(50), login)
                            // .input('password', sql.VarChar(50), password)
                            // .output('output_parameter', sql.VarChar(50))
                            .execute(procedure)];
                case 2:
                    result = _a.sent();
                    console.dir(result.recordset);
                    return [2 /*return*/, result.recordset[0]];
                case 3:
                    err_5 = _a.sent();
                    console.error(err_5);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserByloginProcedure(login) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .input('login', sql.VarChar(50), login)
                            // .input('password', sql.VarChar(50), password)
                            // .output('output_parameter', sql.VarChar(50))
                            .execute('get_user_by_name')];
                case 2:
                    result = _a.sent();
                    console.dir(result.recordset);
                    return [2 /*return*/, result.recordset[0]];
                case 3:
                    err_6 = _a.sent();
                    console.error(err_6);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserByIdProcedure(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.request()
                            .input('user_id', sql.Char(24), id)
                            // .input('password', sql.VarChar(50), password)
                            // .output('output_parameter', sql.VarChar(50))
                            .execute('get_user_by_id')];
                case 2:
                    result = _a.sent();
                    console.dir(result.recordset);
                    return [2 /*return*/, result.recordset[0]];
                case 3:
                    err_7 = _a.sent();
                    console.error(err_7);
                    return [3 /*break*/, 5];
                case 4:
                    if (pool) {
                        pool.close();
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// dropeUsersTable()
// createUsersTable()
// addUser('john2', 'password123')
//     .then((insertedUser: any) => {
//         console.log('Inserted user:', insertedUser);
//     });
// getUserById('6446846f9387df8ed69a77a1')
// getUserById('6446856a0419315e2f83b571')
// getUsersProcedure('get_users')
// getUserByIdProcedure('6446856a0419315e2f83b571')
getUserByloginProcedure('john2');
