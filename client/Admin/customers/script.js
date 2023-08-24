const fetchAllUsers = async ()=>{
    try {

        let html =``

        const res = await fetch('http://localhost:5000/api/v1/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        

        const data = await res.json()
        const users = data.users 

        users.map((user, index) => {
            html += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
            </tr>
            `
        })

        const tbody = document.querySelector('#tbody')
        tbody.innerHTML = html
        
    } catch (error) {

        // console.log(error)
        // alerts.innerHTML = `
        // <div class="alerts">${error.message}</div>
        // `
        // setTimeout(()=>{
        //     alerts.innerHTML =''
        // },3000)
        
    }
}