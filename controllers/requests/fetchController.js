const fetch = require('node-fetch');

module.exports = {
    requestGet() {
        fetch('https://google.com')
            .then(res => res.text())
            .then(text => console.log(text));
    },
    requestPost() {
        let todo = {
            userId: 123,
            title: "loren impsum doloris",
            completed: false
        };

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => console.log(json));
    },
    requestPut() {
        let todo = {
            userId: 123,
            title: "loren impsum doloris",
            completed: false
        };

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => console.log(json));
    }
}