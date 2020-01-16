<?php

use Faker\Generator as Faker;
use App\Models\Category;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Category::class, function (Faker $faker): array {
    return [
        'name' => $faker->name,
    ];
});
