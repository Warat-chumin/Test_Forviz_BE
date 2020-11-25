const express = require("express");
var bodyParser = require("body-parser");
const { Op } = require("sequelize");
const cors = require("cors");

const app = express();
const db = require("./utils/db.config");
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const sequelize = db.sequelize;
const BookingData = db.booking_data;

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/checkAvailability", jsonParser, async (req, res) => {
  if (Object.keys(req.body).length) {
    console.log("Check Pass");
    const Data = await BookingData.findAll({
      where: {
        roomId: req.body.roomId,
        startTime: {
          [Op.gte]: req.body.startTime,
        },
        endTime: {
          [Op.lte]: req.body.endTime,
        },
      },
    });
    if (!Object.keys(Data).length) {
      res.json(true);
    } else {
      res.json(false);
    }
  } else {
    res.json("Error: data not found.");
  }
});

app.post("/getBookingsForWeek", jsonParser, async (req, res) => {
  if (req.body.weekNo == 0) {
    const Data = await BookingData.findAll({
      where: sequelize.where(
        sequelize.fn("date", sequelize.col("startTime")),
        sequelize.fn("CURDATE")
      ),
    });
    res.json(Data);
  } else if (req.body.weekNo == 1) {
    const Data = await BookingData.findAll({
      where: sequelize.where(
        sequelize.fn("YEARWEEK", sequelize.col("startTime"), 1),
        sequelize.fn("YEARWEEK", sequelize.fn("CURDATE"), 1)
      ),
    });
    res.json(Data);
  } else if (req.body.weekNo == 2) {
    const Data = await BookingData.findAll({
      where: sequelize.where(
        sequelize.fn("YEARWEEK", sequelize.col("startTime"), 1),
        sequelize.fn(
          "YEARWEEK",
          sequelize.literal("DATE_ADD(CURDATE(), INTERVAL 7 DAY)"),
          1
        )
      ),
    });
    res.json(Data);
  }
});

app.listen(port, () => {
  console.log("Start server at port " + port + ".");
});
