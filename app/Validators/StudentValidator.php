<?php

namespace App\Validators;

use Illuminate\Support\Facades\Validator;

class StudentValidator
{
    public static function studentValidate(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'longitude' => 'required|numeric|between:-180,180',
            'latitude' => 'required|numeric|between:-90,90',
        ]);

        return $validator;
    }
}