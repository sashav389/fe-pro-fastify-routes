import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', function (request, reply) {
  if(checkOnFuck(request.body)){
    reply.code(403)
      .send( 'unresolved');
  }
  reply.send( request.body.toUpperCase());
});

fastify.post('/lowercase', function (request, reply) {
  if(checkOnFuck(request.body)){
    reply.code(403)
      .send( 'unresolved');
  }
  reply.send( request.body.toLowerCase());
});

fastify.get('/user/:id', function (request, reply) {
  const user = users[request.params.id];
  if(user != null)
    reply.send(user);
  else{
    reply.code(400)
      .send( 'User not exist');
  }
});

fastify.get('/users', function (request, reply) {
  const filter = request.query.filter;
  let value = request.query.value;
  value = filter === "age" ? Number(value) : value;
  if(filter != null && value != null){
    reply.send(Object.values(users).filter(user => {
      if(user[filter] === value)
      return user;
    }));
  }
  else {
    reply.send(Object.values(users));
  }
});

/**
 *
 * @param {String} word
 */
function checkOnFuck(word){
   return word.toLowerCase().includes("fuck");
}

export default fastify;
