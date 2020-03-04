function makePost() {
    document.getElementById("form").setAttribute("method","post");
    document.getElementById("makePost").classList.add("btn-secondary");
    document.getElementById("makePost").classList.remove("btn-success");
    document.getElementById("makeGet").classList.remove("btn-secondary");
    document.getElementById("makeGet").classList.add("btn-success");
}


function makeGet() {
    document.getElementById("form").setAttribute("method","get");
    document.getElementById("makePost").classList.remove("btn-secondary");
    document.getElementById("makePost").classList.add("btn-success");
    document.getElementById("makeGet").classList.add("btn-secondary");
    document.getElementById("makeGet").classList.remove("btn-success");
}