<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Validators\StudentValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class StudentController extends Controller
{
    public function storeStudents(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:csv,txt|max:10240', // Max file size: 10MB
            ]);

            $path = $request->file('file')->getRealPath();
            $data = array_map('str_getcsv', file($path));

            // Remove the header from the data
            array_shift($data);

            DB::beginTransaction();

            foreach ($data as $index => $row) {
                $student = [
                    'name' => $row[0],
                    'latitude' => $row[1],
                    'longitude' => $row[2],
                ];

                $validator = StudentValidator::studentValidate($student);
                if ($validator->fails()) {
                    return response()->json(['error' => "Validation failed for row " . ($index + 2) . ": " . $validator->errors()->first()], 422);
                }

                Student::create($student);
            }

            DB::commit();

            return response()->json(['message' => 'Students data ingested successfully'], 200);
        } catch (Throwable $th) {
            DB::rollBack();

            logger()->error('Error ingesting data from student_locations.CSV file: ' . $th->getMessage());

            return response()->json(['error' => 'An error occurred while ingesting students data. Please try again later.'], 500);
        }
    }
}
