function getPosts(userId) {
    new Promise(function (resolve, reject) {
        fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
            .then(response => {

                if (response.ok) {

                    return response.json()
                } else {
                    reject('Error')
                }
            }).then(posts => {
                document.getElementById("posts").innerHTML = ""
                for (post of posts) {
                    let content = `
                        <div id="post">
                            <h3>${post.title}</h3>
                            <h4>${post.body}.</h4>
                        </div>
                        `
                    document.getElementById("posts").innerHTML += content
                }
                resolve()
            })
    })
}




function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {

            if (response.ok) {

                return response.json()
            }
        }).then(users => {
            document.getElementById("users").innerHTML = ""
            for (user of users) {
                let content = `
                <div id="user" onclick="userClicked(${user.id}, this)">
                    <h3>${user.name}</h3>
                    <h3>${user.email}</h3>
                </div>
                `
                document.getElementById("users").innerHTML += content
            }
        })
}


getUsers()
    .then(() => {
        getPosts(1)
    }).catch((error) => {
        console.error(error)

    })

// userClicked

function userClicked(id, el) {
    getPosts(id)
    let selectedElement = document.getElementsByClassName("selected")
    for (element of selectedElement) {
        element.classList.remove("selected")
    }
    el.classList.add("selected")
}