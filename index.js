
document.getElementById('datePicker').value = new Date().toLocaleDateString('en-CA');
document.getElementById("createUser").addEventListener("submit", createUser);
document.getElementById("transaction").addEventListener("submit", transaction);

var users = [];


//submit function for user form
function createUser(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    let payload = {
        user: form.get('user'),
        currency: form.get('currency'),
        description: form.get('description'),
        balance: form.get('balance'),

    }
    let url = 'http://localhost:5000/api/accounts/'
    let request = {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    };
    fetchCall(url, request)
        .then(data => {
            if (data.user) {
                users.push(form.get('user'))
                document.getElementById('createUser').reset();
                updateUsers();
                console.log('user created')
                console.log(data)
            } else {
                console.log(data.error)
            }
        });
};

//submit function for transaction form
function transaction(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let user = form.get('user');
    let payload = {
        date: form.get('date'),
        object: form.get('object'),
        amount: form.get('amount'),
    }

    let url = 'http://localhost:5000/api/accounts/' + user + '/transactions';
    let request = {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    };
    fetchCall(url, request)
        .then(data => {
            if(!data.error){
            document.getElementById('transaction').reset();
            console.log('transaction created')
            console.log(data)
            }else{
                console.log(data)
            }
        });
};


//Creates all the user options for data List via transactions form
function updateUsers() {
    users.forEach(user => {
        var optionElement = document.createElement("option");
        optionElement.value = user;
        document.getElementById("allUsers").appendChild(optionElement);

    });
}

function fetchCall(url, req) {

    return fetch(url, req)
        .then(response => response.json())
        .then(data => { return data })
        .catch(err => {
            console.error(err);
        });
};