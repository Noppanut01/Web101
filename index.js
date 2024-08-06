const validateData = (userData) => {
    let error = []
    if (!userData.firstname) {
        error.push('กรุณาใส่ชื่อจริง')
    }
    if (!userData.firstname) {
        error.push('กรุณาใส่ชื่อจริง')
    }
    if (!userData.firstname) {
        error.push('กรุณาใส่ชื่อจริง')
    }
    if (!userData.lastname) {
        error.push('กรุณาใส่นามสกุล')
    }
    if (!userData.age) {
        error.push('กรุณาใส่อายุ')
    }
    if (!userData.gender) {
        error.push('กรุณาใส่เพศ')
    }
    if (!userData.interests) {
        error.push('กรุณาใส่ความสนใจ')
    }
    if (!userData.description) {
        error.push('กรุณาใส่ลายละเอียดของคุณ')
    }
    return error
}

let submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname')
    let lastNameDOM = document.querySelector('input[name=lastname')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
    let descriptionDOM = document.querySelector('textarea[name=description]')
    let messageDOM = document.getElementById('message')

    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i < interestDOMs.length - 1) {
                interest += ', '
            }
        }
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            interests: interest,
            description: descriptionDOM.value
        }

        console.log('submit data', userData)
        const errors = validateData(userData)

        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบ',
                errors: errors,
            }
        }
        const response = await axios.post('http://localhost:8000/users', userData)
        console.log('response', response.data)
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย'
        messageDOM.className = 'message success'
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)
        // if (error.response) {
        //     console.log(error.response.data.message)
        // }
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }

}