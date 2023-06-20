const http = require("http");
const Koa = require("koa");
const { koaBody } = require("koa-body");

const listTask = {
  0: { value: "первое дело", text: "Сделать первое дело", status: "done" },
  1: { value: "второе дело", text: "Сделать второе дело", status: "inwork" },
  2: { value: "третье дело", text: "Сделать третье дело", status: "inwork" }
};
let id = 1;
const app = new Koa();
app.use(
  koaBody({
    urlencoded: true,
  })
);
app.use((ctx, next) => {
  if (ctx.request.method !== "OPTIONS") {
    next();
    return;
  }
  ctx.response.set("Access-Control-Allow-Origin", "*");
  ctx.response.set("Access-Control-Allow-Credentials", "true");
  ctx.response.set(
    "Access-Control-Allow-Methods",
    "DELETE, PUT, PATCH, GET, POST"
  );
  ctx.response.status = 204;
  next();
});
app.use((ctx, next) => {
  ctx.response.set("Access-Control-Allow-Origin", "*");
  if (ctx.request.method === "GET") {
    if (ctx.request.query.id) {
      ctx.response.status = 200;
      ctx.response.body = listTask[ctx.request.query.id];
    } else {
      ctx.response.status = 200;
      ctx.response.body = listTask;
    }
  } else if (ctx.request.method === "POST") {
    listTask[++id] = { value: ctx.request.body.value, status: "inwork" };
    ctx.response.status = 200;
    ctx.response.body = id;
  } else if (ctx.request.method === "DELETE") {
    delete listTask[ctx.request.query.id];
    ctx.response.status = 200;
  } else if (ctx.request.method === "PATCH") {
    if (!ctx.request.body) {
      if (listTask[ctx.request.query.id]["status"] !== "done") {
        listTask[ctx.request.query.id]["status"] = "done";
      } else {
        listTask[ctx.request.query.id]["status"] = "inwork";
      }
    } else {
      listTask[ctx.request.query.id]["value"] = ctx.request.body.value;
      listTask[ctx.request.query.id]["text"] = ctx.request.body.text;
    }
    ctx.response.status = 200;
  }

  next();
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is listening to " + port);
});
