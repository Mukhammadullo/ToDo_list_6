let tbody = document.querySelector(".tbody")

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

//get
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



// delete
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