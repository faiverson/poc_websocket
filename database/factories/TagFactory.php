<?php

use Faker\Generator as Faker;
use App\Models\Tag;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Tag::class, function (Faker $faker): array {
    return [
        'name' => $faker->name,
    ];
});
