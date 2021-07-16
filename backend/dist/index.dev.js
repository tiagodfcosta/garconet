"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var fs = _interopRequireWildcard(require("fs/promises"));

var _db = require("./db.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 3001;
var app = (0, _express["default"])();
app.use(_express["default"].json()); // validação dos dados inseridos com os dados na base de dados

app.post("/auth", function _callee(req, res) {
  var _req$body, username, password, user, sessionId;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _db.findUser)(username));

        case 3:
          user = _context.sent;

          if (!(user && user.password === password)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap((0, _db.insertSession)(user._id));

        case 7:
          sessionId = _context.sent;
          res.status(200).json({
            token: sessionId
          });
          _context.next = 12;
          break;

        case 11:
          res.sendStatus(404);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}); // criação de user na base de dados

app.post("/user", function _callee2(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _db.insertUser)(req.body));

        case 2:
          id = _context2.sent;
          res.status(200).json({
            id: id
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/category", function _callee3(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _db.findProducts)());

        case 3:
          products = _context3.sent;
          res.status(200).json({
            products: products
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log("erroooou" + _context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post("/tray", function _callee4(req, res) {
  var tray;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _db.updateTray)(req.body));

        case 2:
          tray = _context4.sent;
          res.status(200).send("you did it");

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post("/order", function _callee5(req, res) {
  var bill;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _db.createBill)());

        case 2:
          bill = _context5.sent;
          res.status(200).send("conta criada bebe");

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/qtdvalue", function _callee6(req, res) {
  var tray;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _db.findTray)());

        case 2:
          tray = _context6.sent;
          // if (!tray) {
          //     res.status(200).send({
          //         "quantidade": 0,
          //         "valortotal": 0,
          //         "valor": 0
          //     })
          // } else {
          res.status(200).send(tray); //}

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //checar
// app.get("/qtdvaluesomado", async (req, res) => {
//     const bill = await findBill()
//     res.status(200).json(bill) 
// })

app.get("/billvalue", function _callee7(req, res) {
  var bill;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _db.getBillAmount)());

        case 2:
          bill = _context7.sent;
          res.status(200).json(bill);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get("/seebill", function _callee8(req, res) {
  var bill;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _db.checkBill)());

        case 2:
          bill = _context8.sent;

          if (bill) {
            res.status(200).json(bill);
          }

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/opentrays", function _callee9(req, res) {
  var trays;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _db.getOpenTrays)());

        case 2:
          trays = _context9.sent;
          res.status(200).json(trays);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.post("/decrement", function _callee10(req, res) {
  var trays;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _db.decrementQuantity)(req.body));

        case 2:
          trays = _context10.sent;
          res.status(200).send("foi!");

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.post("/increment", function _callee11(req, res) {
  var trays;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap((0, _db.incrementQuantity)(req.body));

        case 2:
          trays = _context11.sent;
          res.status(200).send("foi!");

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.post("/deliver", function _callee12(req, res) {
  var deliver;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap((0, _db.deliverOrder)(req.body));

        case 2:
          deliver = _context12.sent;
          res.sendStatus(200);

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.get("/killbill", function _callee13(req, res) {
  var billkilled;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap((0, _db.killBill)());

        case 2:
          billkilled = _context13.sent;
          res.sendStatus(200);

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.listen(PORT, function () {
  return console.log('Camões está aqui para te ouvir');
});