const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data))
};

// //{
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }
const loadLevelWord = (id) =>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
}

const displayLevelWords = (words) => {
    // get the container and empty

    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = "";

    // get into every words or data

    for (let word of words) {
        // create element 
        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `
        <div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
      </div>
        `;

        // append

        wordsContainer.append(wordDiv);
    }
}


const displayLessons = (lessons) => {
    // get the container and empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // get into every lessons
    for (let lesson of lessons) {
    // create element
    console.log(lesson);
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
    `

    // append

    levelContainer.append(btnDiv);
    }
}

loadLessons();