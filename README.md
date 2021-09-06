# Shinigami As A Service

This project exposes the [Shinigami Extension](https://shinigami-eyes.github.io/) as an HTTP API that can be queried to see if a user is in any specific category.


## API

This app has a single endpoint.

`GET /user/:service/:user`

For example-

[/user/twitter/shinigamieyest](/user/twitter/shinigamieyest)
```json
{
  "transphobic":false,
  "transfriendly":true
}
```
