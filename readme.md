Bakery app
===========

To run:

1. yarn install

2. yarn run start

3. in postman or curl or something:

POST body to `http://localhost:3000/bakery/` with type 'application/json' the following :

```
[
    {
        "id": "VS5",
        "amount": 10
    },
    {
    	"id": "MB11",
    	"amount": 14
    },
    {
    	"id": "CF",
        "amount": 13
    }
]
```

To test:

1. yarn run test


*NB*
- Error checking needs to be better.

- Exceptions need to be caught and correct response sent to client

- algorithm is brute force, probably should be smarter!
