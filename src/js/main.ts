//Startfunktion som laddar in kurser sparade i local storage
window.onload = init;
function init(): void {
    loadFromLocalStorage();
}

//Interface för kurs
interface Course {
    code: string;
    name: string;
    progression: string;
    url: string;
}

//Funktion för att spara kurser i localStorage
function saveToLocalStorage(course: Course): void {
    //Läs in befintlig information från localStorage
    const storedCourses: string | null = localStorage.getItem("courses");

    //Spara befintlig information i en array
    let storedCoursesArr: Course[] = [];
    if (storedCourses) {
        storedCoursesArr = JSON.parse(storedCourses);
    }

    //Lägg till ny information till den befintliga
    storedCoursesArr.push(course);

    //Lagrar arrayen i en JSON-string och lagrar i localStorage
    localStorage.setItem("courses", JSON.stringify(storedCoursesArr));
}

//Funktion för att visa sparade kurser när sidan läses in
function loadFromLocalStorage(): void {
    //Läs in befintlig information från localStorage
    const storedCourses: string | null = localStorage.getItem("courses");

    //Spara befintlig information i en array
    let storedCoursesArr: Course[] = [];
    if (storedCourses) {
        storedCoursesArr = JSON.parse(storedCourses);
    }

    //Loopa igenom varje sparad kurs och skicka informationen till funktionen displayCourses
    storedCoursesArr.forEach((course: Course) => {
        displayCourses(course);
    });
}

//Funktion för att skriva ut kurser
function displayCourses(course: Course): void {
    const courseContainer = document.getElementById("courseContainer") as HTMLDivElement;

    if (courseContainer) {
        const courseElement = document.createElement("div") as HTMLDivElement;
        courseElement.innerHTML = `
        <p><strong>Kurskod:</strong> ${course.code}</p>
        <p><strong>Kursnamn:</strong> ${course.name}</p>
        <p><strong>Progression:</strong> ${course.progression}</p>
        <p><strong>URL till kursplan:</strong> ${course.url}</p>
        `;
        courseContainer.appendChild(courseElement);

        //Skapa knapp för att kunna radera kurs
        const deleteBtn = document.createElement("button") as HTMLButtonElement;
        deleteBtn.innerHTML = "Radera";

        courseElement.appendChild(deleteBtn);

        //Eventlistner för knapp
        deleteBtn.addEventListener("click", () => {
            courseElement.innerHTML = "";

            removeFromLocalStorage(course);
        });
    }
}

function removeFromLocalStorage(course: Course): void {
        //Läs in befintlig information från localStorage
        const storedCourses: string | null = localStorage.getItem("courses");

        //Spara befintlig information i en array
        let storedCoursesArr: Course[] = [];

        if (storedCourses) {
            storedCoursesArr = JSON.parse(storedCourses);
        }
    
        //Hitta den kurs som ska tas bort
        const courseIndex: number = storedCoursesArr.findIndex((c:Course) => c.code === course.code);

        //If-sats som kontrollerar om kursen redan finns i arrayen
        if (courseIndex !== -1) {
            //Ta bort kurs
            storedCoursesArr.splice(courseIndex, 1);
        }
    
        //Lagrar arrayen i en JSON-string och lagrar i localStorage
        localStorage.setItem("courses", JSON.stringify(storedCoursesArr));
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

    //Rensar formuläret
    courseForm.reset();

    //Sparar kursen i local storage
    saveToLocalStorage(newCourse);

    //Använd display courses för att skriva ut kursinfo
    displayCourses(newCourse);
});