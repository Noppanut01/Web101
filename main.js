let students = [
    {
        name: 'mike',
        score: 50,
        grade: 'A'
    },
    {
        name: 'test',
        score: 60,
        grade: 'C'
    },
    {
        name: 'jj',
        score: 65,
        grade: 'D'
    }
]

let student = students.find((s) => {
    if (s.name == 'test') {
        return true
    }
})
let high_score = students.filter((s) => {
    if (s.score >= 60)
        return true;
})
console.log(student)
console.log(high_score)
