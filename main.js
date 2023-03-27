import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

const PORT = process.env.PORT || 3000;
let users = [
  { id: 1, name: `Tarcísio`, age: 22 },
  { id: 2, name: `Paulo`, age: 23 },
  { id: 3, name: `Vanessa`, age: 18 },
  { id: 4, name: `User delete`, age: 99 },
];
// app.use =>middleware criado para definir que todas nossas
//request vao ser enviadas no forma .json
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Hello, Servidor rodadno em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
  return response.send(`<h1>Hello World</h1>`);
});

app.get("/users", (request, response) => {
  return response.send(users);
});

// o id na rota vem como string por isso tem que converter para number
// http://localhost:3000/users/2  => o parametro passado é 2 e
// o userId vai ser 2, pois depois do ":" vai ser o parametro, mas nao coloca
// os : na url
app.get("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const user = users.find((user) => {
    return user.id === Number(userId);
  });
  return response.send(user);
});

// obss: coloca um middleware com o formato que vc vai enviar
// as informaçoes no caso é em formato .json
app.post("/users", (request, response) => {
  const newUser = request.body;

  users.push(newUser);

  // antes do send colocar o status
  return response.status(StatusCodes.CREATED).send(newUser);
});

//recurso de put para atulizar usuario

app.put("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const updatedUser = request.body;

  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updatedUser;
    }

    return user;
  });
  return response.status(StatusCodes.OK).send(updatedUser);
});

app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const updatedUser = request.body;

  users = users.filter((user) => {
    return user.id !== Number(userId);
  });
  return response.status(StatusCodes.NO_CONTENT).send();
});
