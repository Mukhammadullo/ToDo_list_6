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
        console.log(data);
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
            editUser(elem)
        }

        // isComplete
        let check = document.createElement("input")
        check.type = "checkbox"
        check.checked = elem.isComplete
        check.onclick = () => {
            elem.isComplete = !elem.isComplete
            isCompleteUser(elem.id,elem)
        }
        if (elem.isComplete == true) {
            forName.style.textDecoration = "line-through"
        }

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



///edit
async function asynceditUser(id,newEditUser) {
    try {
        let response = await fetch(`${url}/${id}` ,{
            method : "PUT",
            headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
            },
            body : JSON.stringify(newEditUser)
        })
    } catch (error) {
        console.log(error);
    }
}


function editUser(elem) {
    dialogEdit.showModal()
    EditName.value = elem.name
    EditAvatar.value = elem.avatar
    bntSave.onclick = () => {
        let newEditUser = {
            name: EditName.value,
            avatar: EditAvatar.value
        }
        asynceditUser(elem.id,newEditUser)
        dialogEdit.close()
    }

}


async function isCompleteUser(id,user) {
    try {
        let response = await fetch(`${url}/${id}`, {
            method : "PUT",
             headers : {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body : JSON.stringify(user)
        })
    } catch (error) {
        console.log(error);
    }
}







