let tbody = document.querySelector(".tbody")
let url = "https://655367345449cfda0f2ea0f3.mockapi.io/todo"

async function getData() {
    try {
        let reponse = await fetch(url)
        let data = await reponse.json()
        get(data)
    } catch (error) {
        console.error(error)
    }
}
getData()


// get
function get(newData) {
    tbody.innerHTML = ""
    newData.forEach(element => {

        let tr = document.createElement("tr")

        // title
        let forTitle = document.createElement("h2")
        forTitle.innerHTML = element.title

        // forName
        let forName = document.createElement("h3")
        forName.innerHTML = element.name

        // forAvatar
        let forAvatar = document.createElement("img")
        forAvatar.src = element.avatar

        // btnDelete
        let btnDelete = document.createElement("button")
        btnDelete.innerHTML = "Delete"
        btnDelete.onclick = () => {
            delUser(element.id)
        }

        let card = document.createElement("div")
        card.append(forName, forTitle, forAvatar, btnDelete)

        tbody.appendChild(card)
    });
}


