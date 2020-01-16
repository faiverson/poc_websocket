<?php

use Faker\Generator as Faker;
use App\Models\Task;
use App\Models\User;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Task::class, function (Faker $faker): array {
    return [
        'user_id' => function () {
            return factory(User::class)->create()->getKey();
        },
        'name' => $faker->unique()->sentence,
    ];
});
