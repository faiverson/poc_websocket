<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\User::class, 10)->create();
        factory(\App\Models\Post::class, 10)->create();
        factory(\App\Models\Task::class, 10)->create();
    }
}
