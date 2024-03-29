//Interface för kurs
interface Course {
    code: string;
    name: string;
    progression: string;
    url: string;
}

//Funktion för att skriva ut kurser
function displayCourses(course: Course): void {
    const savedCourses = document.getElementById("savedCourses");
    if (savedCourses) {
        savedCourses.innerHTML = `
        <p><strong>Kurskod:</strong> ${course.code}</p>
        <p><strong>Kursnamn:</strong> ${course.name}</p>
        <p><strong>Progression:</strong> ${course.progression}</p>
        <p><strong>URL till kursplan:</strong> ${course.url}</p>
        `;
    }
}

//Hämta information om formulär
const courseForm = document.getElementById("courseForm") as HTMLFormElement;

//Händelselyssnare med en funktion som gör att ordinarie funktion för submit-knappen inaktiveras
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //Hämta information från formuläret
    const courseCode = document.getElementById("courseCode") as HTMLInputElement;
    const courseName = document.getElementById("courseName") as HTMLInputElement;
    const courseProgression = document.getElementById("courseProgression") as HTMLInputElement;
    const courseUrl = document.getElementById("courseUrl") as HTMLInputElement;

    //Ny kurs
    const newCourse: Course = {
        code: courseCode.value,
        name: courseName.value,
        progression: courseProgression.value,
        url: courseUrl.value
    }

    //Använd display courses för att skriva ut kursinfo
    displayCourses(newCourse);
});