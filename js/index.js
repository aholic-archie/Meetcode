
async function getApiData() {
    let promise = await fetch("https://run.mocky.io/v3/511fa794-6bfb-4c9f-9adb-9e18d62d7003")
    let data = await promise.json()
    console.log(data)
    return data
}

let apiData = await getApiData()
console.log("apidata:", apiData)
let questionsList = apiData.problemsetQuestionList.questions

function getTableRow(title, acRate, difficulty) {
    let tRow = document.createElement("tr")
    tRow.innerHTML = `
    <tr>
    
            <td>${title}</td>
    
            <td>${acRate}</td>
    
            <td>${difficulty}</td>
    
    </tr>
    `
    return tRow
}



function populateDetails(questionsList) {
    let tBody = document.getElementById("table-body")
    tBody.innerHTML = ""
    questionsList.forEach((questionObj) => {
        let title = questionObj.title
        console.log(title)
        let acceptance = `${questionObj.acRate.toFixed(2)} %`
        let difficulty = questionObj.difficulty
        let tRowContent = getTableRow(title, acceptance, difficulty)
        // console.log(tRowContent)
        tBody.append(tRowContent)
    });
}

function sortQuestionsByAcceptanceRate(questionsList) {
    let newQuestionsArray = questionsList.sort((q1, q2) => {
        return q2.acRate - q1.acRate
    })
    // console.log("newQuestinsArray:", newQuestionsArray)
    return newQuestionsArray
}
let acceptanceHeader = document.querySelector("#questions-table > thead > tr > th:nth-child(2)")
acceptanceHeader.addEventListener("click", function () {
    let newSortedQuestionsArray = sortQuestionsByAcceptanceRate(questionsList)
    populateDetails(newSortedQuestionsArray)
})
// sortQuestionsByAcceptanceRate(questionsList)
// populateDetails(questionsList)