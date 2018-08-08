# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Additional notes

### Documented CRUD

To make GET requests to the server intended to update a review given a review id, a field and a value:

`curl -H "Content-Type: application/json" -X GET -d '{"reviewid":"176"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make POST request to the server intended to post a new review given a listing id:

`curl -H "Content-Type: application/json" -X POST -d '{"listingid":"3", "userid":"3", "accuracy":"2.4", "communication":"2.0", "cleanliness":"2.1", "location":"2.2", "check_in":"2.3", "value":"2.4", "date": "2011-02-01 00:00:00", "content":"Second Test"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make DELETE requests to the server intended to delete a review given a review id:

`curl -H "Content-Type: application/json" -X DELETE -d '{"reviewid":"177"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make PUT requests to the server intended to update a review given a review id, a field and a value:

`curl -H "Content-Type: application/json" -X PUT -d '{"reviewid":"176", "field":"accuracy", "value":"4.9"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`
