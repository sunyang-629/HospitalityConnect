<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Validators\StudentValidator;
use Location\Distance\Vincenty;
use Location\Coordinate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class StudentController extends Controller
{
    public function storeStudents(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:csv,txt|max:10240',
            ]);

            $path = $request->file('file')->getRealPath();
            $data = array_map('str_getcsv', file($path));

            //*!  Remove the header from the data */
            array_shift($data);

            //** start DB */
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
            //** end DB */

            return response()->json(['message' => 'Students data ingested successfully'], 200);
        } catch (Throwable $th) {
            DB::rollBack();

            logger()->error('Error ingesting data from student_locations.CSV file: ' . $th->getMessage());

            return response()->json(['error' => 'An error occurred while ingesting students data. Please try again later.'], 500);
        }
    }

    public function getNearbyStudents(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                'latitude' => 'required|numeric|min:-90|max:90',
                'longitude' => 'required|numeric|min:-180|max:180',
                'radius' => 'required|numeric|min:0',
            ]);
            ['latitude' => $latitude, 'longitude' => $longitude, 'radius' => $radius] = $validatedRequest;
    
            $vincenty = new Vincenty();
            $sourceCoordinate = new Coordinate($latitude, $longitude);
    
            $students = Student::select('*')
                ->get()
                ->filter(function ($student) use ($sourceCoordinate, $radius, $vincenty) {
                    $studentCoordinate = new Coordinate($student->latitude, $student->longitude);
                    $distanceInKm = ($vincenty->getDistance($sourceCoordinate, $studentCoordinate)) / 1000;
                    $student->distanceInKm = $distanceInKm;
    
                    return $distanceInKm <= $radius;
                });
    
            if ($students->isEmpty()) {
                return response()->json(['error' => 'No students found within the specified radius.'], 404);
            }
    
            $studentsArray = array_values($students->toArray());
    
            return response()->json($studentsArray);
        } catch (Throwable $th) {
            $errorMessage = $th->getMessage();
            logger()->error('Error getting nearby students: ' . $errorMessage);
            return response()->json(['error' => 'An error occurred while processing your request.'. $errorMessage], 500);
        }

    }
}
