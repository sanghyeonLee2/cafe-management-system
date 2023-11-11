const express = require("express")
const path = require("path");
const morgan = require("morgan")
const {sequelize} = require("./models")
const cors = require("cors");
const app = express()
const session = require("express-session");
const supplierController = require("./controllers/supplierController")
const supplyController = require("./controllers/supplyController")
const customerController = require("./controllers/customerController")
const materialController = require("./controllers/materialController")
const menuController = require("./controllers/menuController")
const orderController = require("./controllers/orderController")
const orderAdminController = require("./controllers/orderAdminController")
const FileStore = require("session-file-store")(session);
app.set("port", process.env.PORT || 8080);

app.use(cors({
    origin: "http://localhost:3000", methods: ["GET", "PUT", "POST", "DELETE", "PATCH"], credentials: true, //쿠키정보 사용하기 위해서
}));

app.use(session({
    secret: "secret", resave: false, //세션을 항상 저장할 지 여부 지정
    store: new FileStore(), saveUninitialized: false, //초기화되지 않은 세션을 저장할 지 여부
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, httpOnly: false, secure: false,
    },
}));
sequelize.sync({force: false})
    .then(() => {
        console.log("DB 연결 성공")
    })
    .catch((err) => {
        console.error(err)
    })

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/menu-order", orderController)
app.use("/user", customerController)
app.use("/supplier", supplierController)
app.use("/supply", supplyController)
app.use("/material", materialController)
app.use("/menu-item", menuController)
app.use("/admin/order",orderAdminController)
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
});

