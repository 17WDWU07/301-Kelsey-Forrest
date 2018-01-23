function getData() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "./js/classData.json",
        success: function(data) {
            console.log(data);
        },
        error: function(response) {
            console.log("Error Code: " + response.status + "\n" + response.statusText);
        }
    })
}

getData();