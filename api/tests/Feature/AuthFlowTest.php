<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\PersonalAccessToken;

uses(RefreshDatabase::class);

it('can login, read me, access a permission route, and logout', function () {
    $permission = Permission::query()->create([
        'name' => 'foo.view',
        'label' => 'View protected foo endpoint',
    ]);

    $role = Role::query()->create([
        'name' => 'admin',
        'label' => 'Administrator',
    ]);

    $role->permissions()->attach($permission);

    $user = User::factory()->create([
        'email' => 'admin@example.com',
    ]);

    $user->roles()->attach($role);

    $login = $this->postJson('/api/v1/auth/login', [
        'email' => 'admin@example.com',
        'password' => 'password',
    ]);

    $token = $login
        ->assertOk()
        ->assertJsonPath('user.email', 'admin@example.com')
        ->assertJsonPath('user.roles.0', 'admin')
        ->json('token');

    $this->withToken($token)
        ->getJson('/api/v1/auth/me')
        ->assertOk()
        ->assertJsonPath('user.permissions.0', 'foo.view');

    $this->withToken($token)
        ->getJson('/api/v1/admin/foo')
        ->assertOk()
        ->assertJsonPath('foo', 'admin-bar');

    $this->withToken($token)
        ->postJson('/api/v1/auth/logout')
        ->assertOk()
        ->assertJsonPath('message', 'Logged out.');

    expect(PersonalAccessToken::query()->count())->toBe(0);
});

it('returns forbidden when the user is missing the required permission', function () {
    $token = User::factory()
        ->create()
        ->createToken('test')
        ->plainTextToken;

    $this->withToken($token)
        ->getJson('/api/v1/admin/foo')
        ->assertForbidden();
});
