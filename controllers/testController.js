

function sayHello(res, req){
    res.status(200).send({message: 'Hello World!'});
}

module.exports = { sayHello };