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
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}
const loadLevelWord = (id) =>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active");
        displayLevelWords(data.data)
    });
}

const displayLevelWords = (words) => {
    // get the container and empty

    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = "";

    if(words.length === 0){
        wordsContainer.innerHTML = `
        <div class="div text-center col-span-full space-y-6 py-10 font-bangla">
        <img class="mx-auto" src="assets/alert-error.png" alt="Alert image loading...">
        <p class="text-[#79716B] text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
      </div>
        `;
    }

    // get into every words or data

    for (let word of words) {
        // create element 
        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `
        <div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "word not available"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "no word"} / ${word.pronunciation ? word.pronunciation : "no word"}"</div>
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
    <button id = "lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
    `

    // append

    levelContainer.append(btnDiv);
    }
}

loadLessons();