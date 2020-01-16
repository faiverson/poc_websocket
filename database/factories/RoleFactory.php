<?php

use Faker\Generator as Faker;
use App\Models\ACL;
use App\Models\Role;

/* @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Role::class, function (Faker $faker): array {
    $roles = ['role_1', 'role_2', 'role_3', 'role_4', 'role_5', 'role_6'];

    return [
        'name' => $faker->unique()->randomElement($roles),
        'acl_id' => function () {
            return factory(ACL::class)->create()->getKey();
        },
    ];
});
