const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { sequelize } = require("./models");
const cors = require("cors");
const app = express();
const session = require("express-session");
const authController = require("./controllers/authController");
const menuController = require("./controllers/menuController");
const orderController = require("./controllers/orderController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");

const FileStore = require("session-file-store")(session);
app.set("port", process.env.PORT || 8080);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true, //쿠키정보 사용하기 위해서
  })
);

app.use(
  session({
    secret: "secret",
    resave: false, //세션을 항상 저장할 지 여부 지정
    store: new FileStore(),
    saveUninitialized: false, //초기화되지 않은 세션을 저장할 지 여부
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    },
  })
);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/orders", orderController);
app.use("/auth", authController);
app.use("/menus", menuController);
app.use("/users", userController);
app.use("/admin", adminController);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
