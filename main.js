let tbody = document.querySelector(".tbody")
let AddName = document.querySelector(".AddName")
let AddImg = document.querySelector(".AddImg")
let btnAdd = document.querySelector(".btnAdd")


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
        btnDel.onclick = () => {
            delUser(elem.id)
        }

        tr.append(forId, forName, forImg, btnDel)

        tbody.append(tr)
    });
}



// add ->post__________________________________________
async function post(newUser) {
    try {
        let response = await fetch(url,{
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

