const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const userDb = require("./config/userDb.js");
const FileStore = require("session-file-store")(session);


const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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


//mysql2/promise 라이브러리의 execute() 함수는 Promise를 반환하며, 이 Promise가 resolve될 때 두 가지 값을 배열 형태로 반환
// 첫 번째 값은 쿼리 결과를 나타내고, 두 번째 값은 메타데이터(컬럼 정보 등)나타냄
app.delete("/menu-item/delete", async (req, res) => {
    const {itemNum} = req.body;
    console.log(req.body)
    try {
        const [result] = await userDb.execute("delete from menu_item where num= ?", [itemNum]);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.post("/menu/insert", async (req, res) => {
    const {
        menuPrice,
        menuClassification,
        isSpecialMenu,
        menuName,
    } = req.body.menuFormState;
    const {recipeInfo} = req.body;
    console.log("recipeInfo:::::",recipeInfo)
    console.log("menuFormState:::::",req.body.menuFormState)
    try {
        const conn = await userDb.getConnection();
        try {
            await conn.beginTransaction();
            const [menuItemResult] = await conn.execute("insert into menu_item(price,classification,is_special_menu, menu_item_name) values (?,?,?,?)", [
                menuPrice,
                menuClassification,
                isSpecialMenu,
                menuName,
            ])
            const menuItemId = menuItemResult.insertId;
            console.log(menuItemId)
            for (let element of recipeInfo) {
                await conn.execute("insert into use_material(menu_item_num, material_usage, material_num) values(?,?,?)", [menuItemId, element.materialUsage, element.num])
            }
            await conn.commit(); //commit() : 트랜잭션 반영
            res.status(200).json({menuItemId})
        } catch (err) {
            await conn.rollback();
            console.log("1",err.message)
            //connection.rollback() : 트랜잭션 롤백(이전 상태로 돌림)
            res.status(500).json({err: err.message});
        } finally { // finally : 프로미스가 완료될 때 호출할 콜백 등록 가능
            conn.release(); //release() : connection 해제
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.toString()});
    }
})

app.post("/order", async (req, res) => {
    const {orderList} = req.body;
    const {payment, userId} = req.body.order;
    try {
        const conn = await userDb.getConnection();
        try {
            await conn.beginTransaction();
            const [orderResult] = await conn.execute("insert into coffee_order(payment, user_id) values (?,?)", [payment, userId])
            const orderId = orderResult.insertId;
            for (let element of orderList) {
                await conn.execute("insert into order_detail(quantity, menu_item_num, coffee_order_num) values(?,?,?)", [orderId, element.menuNum, element.menuQuantity])
            }
            await conn.commit(); //commit() : 트랜잭션 반영
            res.status(200).json({orderId})
        } catch (err) {
            await conn.rollback();
            //connection.rollback() : 트랜잭션 롤백(이전 상태로 돌림)
            res.status(500).json({err: err.message});
        } finally { // finally : 프로미스가 완료될 때 호출할 콜백 등록 가능
            conn.release(); //release() : connection 해제
        }
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
})

app.get("/orderNum", async (req, res) => {
    const {userId} = req.data;
    console.log(req.body);
    try {
        const [result] = await userDb.execute("select order_num from coffee_order where user_id = ?", [userId]);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/supplier/get", async (req, res) => {
    try {
        const [result] = await userDb.execute("select * from supplier");
        res.status(200).json(result);
        console.log("res: ", result)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});
app.get("/material/get", async (req, res) => {
    try {
        const [result] = await userDb.execute("select * from material");
        res.status(200).json(result);
        console.log("res: ", result)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});


app.post("/supplier/insert", async (req, res) => {
    const {
        supplierName, supplierAddress
    } = req.body;
    try {
        const [result] = await userDb.execute("insert into supplier(supplier_name, address) values (?,?)", [supplierName, supplierAddress])
        res.status(200).json({num: result.insertId, supplier_name: supplierName, address: supplierAddress});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
})

app.post("/signup", async (req, res) => {
    const {id, password, username, address, userPhoneNum} = req.body;
    try {
        await userDb.execute("INSERT INTO user (id, pw,user_name, address, phone_num) VALUES (?,?,?, ?, ?)", [id, password, username, address, userPhoneNum]);
        res.send("User registered successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/signin/success", (req, res) => {
    try {
        const data = req.session;
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json("User not found");
    }
});

app.post("/signin", async (req, res) => {
    const {id, password} = req.body;
    console.log(req.body);
    try {
        const [userInfo] = await userDb.execute(`SELECT * FROM user WHERE id = ? and pw= ?`, [id, password]);
        if (userInfo.length > 0) {
            req.session.user = {
                userName: userInfo[0].user_name,
                userAddress: userInfo[0].address,
                userPhoneNum: userInfo[0].phone_num,
                userId: userInfo[0].id,
            };
            try {
                await req.session.save();
                res.status(200).json(req.session.user);
            } catch (err) {
                console.error(err);
                res.status(500).send("Session save error");
            }
        } else {
            res.status(401).json({error: "Invalid credentials"});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

app.post("/supply", async (req, res) => {
    const {periodPayment, supplierNum} = req.body.supplyInfo;
    const {supplyDetail} = req.body;
    console.log(supplyDetail)
    try {
        const conn = await userDb.getConnection();
        try {
            await conn.beginTransaction();
            const [supplyResult] = await conn.execute("insert into supply(period_payment,supplier_num) values (?,?)", [periodPayment, supplierNum])
            const supplyId = supplyResult.insertId;

            for (let element of supplyDetail) {
                await conn.execute("insert into material(num, material_unit, material_name, material_quantity) values(?,?,?,?)", [element.materialNum, element.materialUnit, element.materialName, element.materialQuantity])
            }
            //진행중
            for (let element of supplyDetail) {
                await conn.execute("insert into supply_detail(quantity, price, supply_num, material_num) values(?,?,?,?)", [element.materialQuantity, element.materialPrice, supplyId, element.materialNum])
            }
            await conn.commit(); //commit() : 트랜잭션 반영
            res.status(200).json({supplyId})
        } catch (err) {
            await conn.rollback();
            console.log(err.message)
            //connection.rollback() : 트랜잭션 롤백(이전 상태로 돌림)
            res.status(500).json({err: err.message});
        } finally { // finally : 프로미스가 완료될 때 호출할 콜백 등록 가능
            conn.release(); //release() : connection 해제
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.toString()});
    }
})
app.post("/insert-menu", async (req, res) => {
    const {menuPrice, menuClassification, isSpecialMenu, menuName} = req.body;
    console.log(req.body);
    try {
        const [result] = await userDb.execute("INSERT INTO menu_item (price, classification, is_special_menu,menu_item_name) VALUES (?,?,?,?)", [menuPrice, menuClassification, isSpecialMenu, menuName]);
        res.status(200).json({
            num: result.insertId,
            price: menuPrice,
            classification: menuClassification,
            is_special_menu: isSpecialMenu,
            menu_item_name: menuName
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.put("/update-menu", async (req, res) => {
    const {menuPrice, menuClassification, isSpecialMenu, menuName} = req.body;
    console.log(req.body);
    let sql = 'UPDATE menu_item SET price = ?, classification = ?, is_special_menu = ?, menu_name = ? WHERE classification = ?';

    try {
        const [result] = await userDb.execute(sql, [menuPrice, menuClassification, isSpecialMenu, menuName, menuClassification]);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/get-menu", async (req, res) => {
    try {
        const [result] = await userDb.execute(`SELECT * FROM menu_item`);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});


app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}`);
});


