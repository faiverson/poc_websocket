<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About POC Websocket

A demo (Proof of concept) to merge websocket package with Lighthouse since this is prepare to work with Pusher. 
Also there is not example about how to work with Apollo Client.


## Get Started
You need to setup a database (like sqlite).
The you can run:

`php artisan migrate --seed`
`php artisan serve --port=9001 --host=localhost`
`php artisan websocket:serve --port=6003`

The you need to compile the UI:
`cd apollo-client`
`npm install`
`yarn start`

In the menu you will find the websocket dashboard example and access to

Some examples to use in the GraphQl Playground:
```graphql
mutation createPost($post: String!) {
  createPost(post: $post) {
    body
  }
}
```
PS: this mutation fires the subscription event

```graphql
{
  users(first: 5) {
      data{
        id
        name
      }
    ...pagination
    }
}

fragment pagination on UserPaginator{
    paginatorInfo {
      count
      currentPage
      lastPage
      firstItem
      perPage
      lastItem
      hasMorePages
      total
    }
  }
```
