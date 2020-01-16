<?php

use Faker\Generator as Faker;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Comment::class, function (Faker $faker): array {
    return [
        'comment' => $faker->sentence,
        'user_id' => function () {
            return factory(User::class)->create()->getKey();
        },
        'post_id' => function () {
            return factory(Post::class)->create()->getKey();
        },
    ];
});
