# API

Laravel API application for the template repository.

## Included

- Laravel 13
- Sanctum installed for future API authentication needs
- Public demo endpoint: `GET /api/foo`
- PHPUnit feature test for the demo endpoint

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Endpoint

```http
GET /api/foo
```

Response:

```json
{
  "foo": "bar",
  "message": "Laravel API is connected to React."
}
```

## Tests

```bash
composer test
./vendor/bin/pint --test
```
