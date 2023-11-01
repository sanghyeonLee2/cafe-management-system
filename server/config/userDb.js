const mysql = require("mysql2/promise") // mysql : 콜백으로 작성 mysql2 : Promise API 지원(async/await 문법을 사용가능)
const userDb = mysql.createPool({
     // Pool이 만들어짐 -> connection에 여러개 생성됨
    host: "localhost",
    user: "root",
    password: "178446",
    database: "cafe_management",
    port: 3306,
});

module.exports = userDb;