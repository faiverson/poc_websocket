<?php

use Faker\Generator as Faker;
use App\Models\Post;
use App\Models\Task;
use App\Models\User;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Post::class, function (Faker $faker): array {
    return [
        'title' => $faker->title,
        'body' => $faker->sentence,
        'user_id' => function () {
            return factory(User::class)->create()->getKey();
        },
        'task_id' => function () {
            return factory(Task::class)->create()->getKey();
        },
        'parent_id' => null,
    ];
});
