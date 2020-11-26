Bakery app
===========

To run:

1. yarn install

2. yarn run start

3. Make sure you have node installed, any version after 6 should do.

4. in postman or curl or something:

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


To run tests:

`yarn run test`


*NB*

- algorithm is brute force, probably should be smarter!

- There should be more tests
