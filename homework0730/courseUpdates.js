const courseCatalog = [
  {
    department: "Computer Science",
    courses: [
      { code: "CS101", title: "Intro to Programming", credits: 3 },
      { code: "CS201", title: "Data Structures", credits: 4 },
    ],
    faculty: {
      chair: "Dr. Smith",
      office: "Room 101",
    },
  },
  {
    department: "Mathematics",
    courses: [
      { code: "MATH101", title: "Calculus I", credits: 4 },
      { code: "MATH201", title: "Linear Algebra", credits: 3 },
    ],
    faculty: {
      chair: "Dr. Allen",
      office: "Room 202",
    },
  },
];

//a
const updatedA = courseCatalog.map((dept) =>
  dept.department === "Mathematics"
    ? { ...dept, department: "Applied Math" }
    : dept
);

//b
const updatedB = courseCatalog.map((dept) =>
  dept.department === "Computer Science"
    ? {
        ...dept,
        courses: [
          ...dept.courses,
          { code: "CS301", title: "Algorithms", credits: 4 },
        ],
      }
    : dept
);

//c
const updatedC = courseCatalog.map((dept) =>
  dept.department === "Mathematics"
    ? {
        ...dept,
        courses: dept.courses.filter(
          (course) => course.title !== "Linear Algebra"
        ),
      }
    : dept
);

//d
const updatedD = courseCatalog.map((dept) =>
  dept.faculty.chair === "Dr. Smith"
    ? {
        ...dept,
        faculty: {
          ...dept.faculty,
          office: "Room 111",
        },
      }
    : dept
);

console.log("a. ");
console.log(updatedA);

console.log("b. ");
console.log(updatedB);

console.log("c. ");
console.log(updatedC);

console.log("d. ");
console.log(updatedD);
