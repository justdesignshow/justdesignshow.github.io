<?php
$students = [
    'student1' => [
        'name' => 'Student 1',
        'quote' => 'Quote 1',
        'symbol' => '<>',
        'banner_image' => 'banners/student1.jpg',
        // Add other student-specific data here
    ],
    // Add more students here
];

$student_id = $_GET['id'];
$student = $students[$student_id];

// Extract the student data to variables
extract($student);

// Include the template file
include 'template.php';
?>
