"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertUser = insertUser;
exports.findUser = findUser;
exports.findUserById = findUserById;
exports.insertSession = insertSession;
exports.findSession = findSession;
exports.extendSession = extendSession;
exports.insertProducts = insertProducts;
exports.findProducts = findProducts;
exports.findTray = findTray;
exports.getBillAmount = getBillAmount;
exports.updateTray = updateTray;
exports.createBill = createBill;
exports.checkBill = checkBill;
exports.getOpenTrays = getOpenTrays;
exports.decrementQuantity = decrementQuantity;
exports.incrementQuantity = incrementQuantity;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// salvar uma constante mongo_client
var MongoClient = _mongodb["default"].MongoClient; //salvar uma constante com caminho para o servidor mongodb

var URI = 'mongodb://localhost:27017'; //constante com a nossa BD 

var DB_GARCONET = "authentication"; //Declarar o client

var client; // função que faz algo que nós ainda não sabemos o que é !!! Tal como ligar o MongoDB

function connect(uri) {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!client) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", client);

        case 3:
          client = new MongoClient(uri, {
            //evita que com os novos updates a função deixe de funcionar (useUnifiedTopology: true)
            useUnifiedTopology: true
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(client.connect());

        case 6:
          return _context.abrupt("return", client);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // função que retorna o histórico de ligaçoes realizadas com o server ?????
// Vai receber uma bd e uma string que representa uma colacao 


function getCollection(dbName, colName) {
  var client, db;
  return regeneratorRuntime.async(function getCollection$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connect(URI));

        case 2:
          client = _context2.sent;
          db = client.db(dbName);
          return _context2.abrupt("return", db.collection(colName));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
} // função de criar usuário


function insertUser(user) {
  var collection, res;
  return regeneratorRuntime.async(function insertUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "users"));

        case 2:
          collection = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(collection.insertOne(user));

        case 5:
          res = _context3.sent;
          return _context3.abrupt("return", res.insertedId);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
} // função para encontrar utilizador por nome de utilizador


function findUser(username) {
  var collection, res;
  return regeneratorRuntime.async(function findUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "users"));

        case 2:
          collection = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            username: username
          }));

        case 5:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
} // função para encontrar utilizador por id


function findUserById(id) {
  var collection, res;
  return regeneratorRuntime.async(function findUserById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "users"));

        case 2:
          collection = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            _id: _mongodb["default"].ObjectId(id)
          }));

        case 5:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function insertSession(uid) {
  var collection, res;
  return regeneratorRuntime.async(function insertSession$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "sessions"));

        case 2:
          collection = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(collection.insertOne({
            uid: uid,
            expiresAt: new Date(new Date().valueOf() + 50 * 60 * 1000)
          }));

        case 5:
          res = _context6.sent;
          return _context6.abrupt("return", res.insertedId);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function findSession(id) {
  var collection, res;
  return regeneratorRuntime.async(function findSession$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "sessions"));

        case 2:
          collection = _context7.sent;
          _context7.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            _id: _mongodb["default"].ObjectId(id)
          }));

        case 5:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function extendSession(id) {
  var collection, res;
  return regeneratorRuntime.async(function extendSession$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "sessions"));

        case 2:
          collection = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(collection.updateOne({
            id: _mongodb["default"].ObjectId(id)
          }, {
            $set: {
              expiresAt: new Date(new Date().valueOf() + 50 * 60 * 1000)
            }
          }));

        case 5:
          res = _context8.sent;
          return _context8.abrupt("return", res);

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function insertProducts(products) {
  var collection, res;
  return regeneratorRuntime.async(function insertProducts$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "products"));

        case 2:
          collection = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(collection.insertMany(products));

        case 5:
          res = _context9.sent;
          return _context9.abrupt("return", res);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function findProducts() {
  var collection, res;
  return regeneratorRuntime.async(function findProducts$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "products"));

        case 2:
          collection = _context10.sent;
          _context10.next = 5;
          return regeneratorRuntime.awrap(collection.find().toArray());

        case 5:
          res = _context10.sent;
          console.log(res);
          return _context10.abrupt("return", res);

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
} // //função com problema
// export async function findBill() {
//     const bill = await getCollection(DB_GARCONET, "conta");
//     const openBill = await bill.findOne({ aberta: true });
//     if (openBill) {
//         let valoresMapeado
//         let valores = openBill.bandeja.reduce((acc, curr) => {
//             valoresMapeado = curr.artigos.reduce((acc, curr) => acc + curr.valor)
//             const valorTotal = acc + valoresMapeado.valor
//             return valorTotal
//         }, 0)
//         return valores;
//     }
// }
//chamar também quando não tiver bandeja aberta


function findTray() {
  var collection, tray, valores, bill, openBill, totalvalue;
  return regeneratorRuntime.async(function findTray$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "btray"));

        case 2:
          collection = _context11.sent;
          _context11.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 5:
          tray = _context11.sent;
          valores = {
            quantity: 0,
            value: 0,
            totalvalue: 0
          };

          if (tray) {
            values = tray.items.reduce(function (acc, curr) {
              return {
                quantity: acc.quantity + curr.quantity,
                value: acc.value + curr.value,
                totalvalue: 0
              };
            }, {
              quantity: 0,
              value: 0,
              totalvalue: 0
            });
          }

          _context11.next = 10;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "conta"));

        case 10:
          bill = _context11.sent;
          _context11.next = 13;
          return regeneratorRuntime.awrap(bill.findOne({
            open: true
          }));

        case 13:
          openBill = _context11.sent;

          if (!openBill) {
            _context11.next = 18;
            break;
          }

          totalvalue = openBill.btray.reduce(function (acc, curr) {
            return acc + curr.items.reduce(function (acc, curr) {
              return acc + curr.value;
            }, 0);
          }, 0);
          values.totalvalue = parseFloat(totalvalue);
          return _context11.abrupt("return", values);

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function getBillAmount() {
  var collection, bill, values;
  return regeneratorRuntime.async(function getBillAmount$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "conta"));

        case 2:
          collection = _context12.sent;
          _context12.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 5:
          bill = _context12.sent;

          if (!bill) {
            _context12.next = 9;
            break;
          }

          values = bill.btray.reduce(function (acc, curr) {
            return acc + curr.items.reduce(function (acc, curr) {
              return acc + curr.value;
            }, 0);
          }, 0);
          return _context12.abrupt("return", values);

        case 9:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function updateTray(info) {
  var collection, tray, item;
  return regeneratorRuntime.async(function updateTray$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "btray"));

        case 2:
          collection = _context13.sent;
          _context13.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 5:
          tray = _context13.sent;

          if (tray) {
            _context13.next = 12;
            break;
          }

          _context13.next = 9;
          return regeneratorRuntime.awrap(collection.insertOne({
            open: true,
            creationDate: new Date(),
            items: []
          }));

        case 9:
          _context13.next = 11;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 11:
          tray = _context13.sent;

        case 12:
          //checa se o artigo existe, se sim, atualiza a quantidade e o valor, se não, manda tudo pra dentro
          item = tray.items.find(function (a) {
            return a.name === info.name;
          });

          if (item) {
            item.quantity += info.quantity;
            item.value += info.value;
          } else {
            tray.items.push(info);
          } //faz um update na collection com as mudanças acima


          _context13.next = 16;
          return regeneratorRuntime.awrap(collection.updateOne({
            _id: tray._id
          }, {
            $set: {
              items: tray.items
            }
          }));

        case 16:
          return _context13.abrupt("return", tray);

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function createBill() {
  var openTray, open, collection, bill, btray, _openTray;

  return regeneratorRuntime.async(function createBill$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "btray"));

        case 2:
          openTray = _context14.sent;
          _context14.next = 5;
          return regeneratorRuntime.awrap(openTray.findOne({
            open: true
          }));

        case 5:
          open = _context14.sent;

          if (!open) {
            _context14.next = 31;
            break;
          }

          _context14.next = 9;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "bill"));

        case 9:
          collection = _context14.sent;
          _context14.next = 12;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 12:
          bill = _context14.sent;

          if (bill) {
            _context14.next = 19;
            break;
          }

          _context14.next = 16;
          return regeneratorRuntime.awrap(collection.insertOne({
            open: true,
            creationDate: new Date(),
            btray: []
          }));

        case 16:
          _context14.next = 18;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 18:
          bill = _context14.sent;

        case 19:
          _context14.next = 21;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "btray"));

        case 21:
          btray = _context14.sent;
          _context14.next = 24;
          return regeneratorRuntime.awrap(btray.findOne({
            open: true
          }));

        case 24:
          _openTray = _context14.sent;
          //adicionar a bandeja na conta
          bill.btray.push(_openTray); //por fim, atualizar a conta

          _context14.next = 28;
          return regeneratorRuntime.awrap(collection.updateOne({
            _id: bill._id
          }, {
            $set: {
              btray: bill.btray
            }
          }));

        case 28:
          _context14.next = 30;
          return regeneratorRuntime.awrap(btray.updateOne({
            _id: _openTray._id
          }, {
            $set: {
              open: false
            }
          }));

        case 30:
          return _context14.abrupt("return", bill);

        case 31:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function checkBill() {
  var collection, bill;
  return regeneratorRuntime.async(function checkBill$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "bill"));

        case 2:
          collection = _context15.sent;
          _context15.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            open: true
          }));

        case 5:
          bill = _context15.sent;
          return _context15.abrupt("return", bill);

        case 7:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function getOpenTrays() {
  var collection, bill;
  return regeneratorRuntime.async(function getOpenTrays$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "bill"));

        case 2:
          collection = _context16.sent;
          _context16.next = 5;
          return regeneratorRuntime.awrap(collection.find({
            open: true
          }).toArray());

        case 5:
          bill = _context16.sent;
          return _context16.abrupt("return", bill);

        case 7:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function decrementQuantity(body) {
  var products, productFound, collection, billFound, trayFound, itemFound, trayUpdated;
  return regeneratorRuntime.async(function decrementQuantity$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "products"));

        case 2:
          products = _context17.sent;
          _context17.next = 5;
          return regeneratorRuntime.awrap(products.findOne({
            nome: body.name
          }));

        case 5:
          productFound = _context17.sent;
          _context17.next = 8;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "bill"));

        case 8:
          collection = _context17.sent;
          _context17.next = 11;
          return regeneratorRuntime.awrap(collection.findOne({
            _id: _mongodb["default"].ObjectId(body.idbill)
          }));

        case 11:
          billFound = _context17.sent;
          console.log(billFound);
          _context17.next = 15;
          return regeneratorRuntime.awrap(billFound.btray.find(function (b) {
            return b._id.toHexString() === body.idbtray;
          }));

        case 15:
          trayFound = _context17.sent;
          console.log(trayFound);
          itemFound = trayFound.items.find(function (a) {
            return a.name === body.name;
          });

          if (itemFound.quantity > 0) {
            itemFound.quantity -= 1;
            itemFound.value -= productFound.price;
          }

          _context17.next = 21;
          return regeneratorRuntime.awrap(collection.updateOne({
            _id: _mongodb["default"].ObjectId(body.idbill)
          }, {
            $set: {
              btray: billFound.btray
            }
          }));

        case 21:
          trayUpdated = _context17.sent;
          return _context17.abrupt("return", trayUpdated);

        case 23:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function incrementQuantity(body) {
  var products, productFound, collection, billFound, trayFound, itemFound, trayUpdated;
  return regeneratorRuntime.async(function incrementQuantity$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "products"));

        case 2:
          products = _context18.sent;
          _context18.next = 5;
          return regeneratorRuntime.awrap(products.findOne({
            nome: body.name
          }));

        case 5:
          productFound = _context18.sent;
          _context18.next = 8;
          return regeneratorRuntime.awrap(getCollection(DB_GARCONET, "bill"));

        case 8:
          collection = _context18.sent;
          _context18.next = 11;
          return regeneratorRuntime.awrap(collection.findOne({
            _id: _mongodb["default"].ObjectId(body.idbill)
          }));

        case 11:
          billFound = _context18.sent;
          console.log(billFound);
          _context18.next = 15;
          return regeneratorRuntime.awrap(billFound.btray.find(function (b) {
            return b._id.toHexString() === body.idbtray;
          }));

        case 15:
          trayFound = _context18.sent;
          console.log(trayFound);
          itemFound = trayFound.items.find(function (a) {
            return a.name === body.name;
          });
          itemFound.quantity += 1;
          itemFound.value += parseFloat(productFound.price);
          _context18.next = 22;
          return regeneratorRuntime.awrap(collection.updateOne({
            _id: _mongodb["default"].ObjectId(body.idbill)
          }, {
            $set: {
              btray: billFound.btray
            }
          }));

        case 22:
          trayUpdated = _context18.sent;
          return _context18.abrupt("return", trayUpdated);

        case 24:
        case "end":
          return _context18.stop();
      }
    }
  });
}