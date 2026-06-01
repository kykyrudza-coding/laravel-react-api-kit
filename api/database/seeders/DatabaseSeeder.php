<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $viewFoo = Permission::query()->firstOrCreate(
            ['name' => 'foo.view'],
            ['label' => 'View protected foo endpoint'],
        );

        $admin = Role::query()->firstOrCreate(
            ['name' => 'admin'],
            ['label' => 'Administrator'],
        );

        $admin->permissions()->syncWithoutDetaching([$viewFoo->id]);

        $user = User::factory()->create([
            'name' => 'Template Admin',
            'email' => 'admin@example.com',
        ]);

        $user->roles()->syncWithoutDetaching([$admin->id]);
    }
}
