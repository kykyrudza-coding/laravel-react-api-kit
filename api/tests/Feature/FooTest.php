<?php

it('returns the public foo response', function () {
    $this->getJson('/api/v1/foo')
        ->assertOk()
        ->assertJson([
            'foo' => 'bar',
        ]);
});
