#! /usr/bin/env node

import inquirer from "inquirer";

// Class representing a Student
class Student {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Class representing a School with students
class School {
    students: Student[] = [];

    addStudent(student: Student) {
        this.students.push(student);
    }
}

// Create an instance of the School class
const school = new School();

// Function to start the interactive program
const programStart = async (school: School) => {
    console.log("Welcome to the Interactive School Program!");

    while (true) {
        // Prompt the user to select an option
        const mainMenuAnswer = await inquirer.prompt({
            name: "selection",
            type: "list",
            message: "Who would you like to interact with?",
            choices: ["Staff", "Student", "Exit"]
        });

        if (mainMenuAnswer.selection === "Staff") {
            console.log("You approach the staff room. Feel free to ask any questions!");

        } else if (mainMenuAnswer.selection === "Student") {
            // Prompt the user to enter a student's name
            const studentAnswer = await inquirer.prompt({
                name: "studentName",
                type: "input",
                message: "Enter the student's name you wish to engage with:"
            });

            const studentName = studentAnswer.studentName;
            const student = school.students.find(s => s.name === studentName);

            if (!student) {
                // If the student doesn't exist, add the new student
                const newStudent = new Student(studentName);
                school.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("A new student has been added.");
            } else {
                // If the student exists, greet the student
                console.log(`Hello again, ${student.name}! Nice to see you.`);
            }

            // Display the current list of students
            console.log("Current list of students:");
            school.students.forEach((student, index) => {
                console.log(`${index + 1}. ${student.name}`);
            });

        } else if (mainMenuAnswer.selection === "Exit") {
            // Exit the program
            console.log("Exiting the program. Goodbye!");
            process.exit();
        }
    }
};

// Start the program
programStart(school);
