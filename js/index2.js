
async function getApiData() {
    let promise = await fetch("https://run.mocky.io/v3/511fa794-6bfb-4c9f-9adb-9e18d62d7003")
    let data = await promise.json()
    console.log(data)
    return data
}

let apiData = await getApiData()
// console.log("apidata:", apiData)
let questionsList = apiData.topicTags
// console.log(questionsList)

function getTableRow(qnType, noOfQn) {
    let tRow = document.createElement("tr")
    tRow.innerHTML = `
    <tr>
    
            <td>${qnType}</td>
    
            <td>${noOfQn}</td>
    
    </tr>
    `
    return tRow
}



function populateDetails(questionsList) {
    let tBody = document.getElementById("table-body")
    tBody.innerHTML = ""
    questionsList.forEach((questionObj) => {
        let qnType = questionObj.name
        // console.log("QnType:", qnType)
        let noOfQn = questionObj.questionCount
        // console.log(noOfQn)
        let tRowContent = getTableRow(qnType, noOfQn)
        // console.log("tRow:", tRowContent)
        tBody.append(tRowContent)
    });
}

function sortByNoOfQuestions(questionsList) {
    let newQuestionsArray = questionsList.sort((q1, q2) => {
        return q2.questionCount - q1.questionCount
    })
    console.log("newQuestinsArray:", newQuestionsArray)
    return newQuestionsArray
}
let noOfQnsHeader = document.querySelector("#questions-table > thead > tr > th:nth-child(2)")
noOfQnsHeader.addEventListener("click", function () {
    let newSortedQuestinsArray = sortByNoOfQuestions(questionsList)
    populateDetails(newSortedQuestinsArray)
})
// let newQnsArray = sortByNoOfQuestions(questionsList)
// populateDetails(newQnsArray)