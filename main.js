let tbody = document.querySelector(".tbody")
let AddName = document.querySelector(".AddName")
let AddImg = document.querySelector(".AddImg")
let btnAdd = document.querySelector(".btnAdd")
let dialogEdit = document.querySelector(".dialogEdit")
let EditName = document.querySelector(".EditName")
let EditAvatar = document.querySelector(".EditAvatar")
let bntSave = document.querySelector(".btnSave")

let url = "https://65536cfd5449cfda0f2eac4e.mockapi.io/To_DO"

async function getData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        get(data)
    } catch (error) {
        console.error(error);
    }
}
getData();

//get_____________________________________________________
function get(newData) {
    tbody.innerHTML = ""
    newData.forEach(elem => {

        let tr = document.createElement("tr")

        let forId = document.createElement("td")
        forId.innerHTML = elem.id

        let forName = document.createElement("td")
        forName.innerHTML = elem.name

        let forImg = document.createElement("td")
        let img = document.createElement("img")
        img.src = elem.avatar
        forImg.append(img)


        // delete
        let btnDel = document.createElement("button")
        btnDel.innerHTML = "Delete"
        btnDel.classList.add("btnDel")
        btnDel.onclick = () => {
            delUser(elem.id)
            
        }

        //edit
        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "Edit"
        btnEdit.classList.add("btnEdit")
        btnEdit.onclick = () => {
            editUser(elem.id)
        }

        // isComplete
        let check = document.createElement("input")
        check.type = "checkbox"
        check.checked = elem.isComplete


        tr.append(forId, forName, forImg, btnDel, btnEdit, check)

        tbody.append(tr)
    });
}



// add ->post__________________________________________
async function post(newUser) {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),

        })
    } catch (error) {
        console.error(error)
    }
}

btnAdd.onclick = () => {
    let newObj = {
        id: Date.now(),
        name: AddName.value,
        avatar: AddImg.value,
        isComplete: false
    }
    post(newObj)
}


// delete____________________________________________
async function delUser(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        })
        getData()
    } catch (error) {
        console.error(error)
    }
}

// editUser
async function putUser(id, edit) {
    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(edit),

        })
    } catch (error) {
        console.error(error)
    }
}




