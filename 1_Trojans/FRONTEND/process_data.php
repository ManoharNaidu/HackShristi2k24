<?php
// Database connection
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "rescued_animals";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $species = $_POST["species"];
  $description = $_POST["description"];

  // Prepare SQL statement
  $sql = "INSERT INTO animals (name, species, description) VALUES ('$name', '$species', '$description')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>
