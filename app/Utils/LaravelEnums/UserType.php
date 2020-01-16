<?php

namespace App\Utils\LaravelEnums;

use BenSampo\Enum\Enum;

final class UserType extends Enum
{
    const Administrator = 'ADMINISTRATOR';
    const Moderator = 'MODERATOR';
}
