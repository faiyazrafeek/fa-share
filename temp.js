

const msg = document.getElementById("message");
const submit = document.getElementById("btn-add");

const database = firebase.database();
const usersRef = database.ref('/'+ create_UUID());


function writeData(){
    if (msg.value != ""){
        const autoId = usersRef.push().key
        usersRef.push().set({
        message: msg.value,
        id : autoId
        });

        Swal.fire(
            'Added',
            'Your message stored!',
            'success'
          )
        msg.value = "";
    }else{
        Swal.fire(
            'Empty Field',
            'Enter your message in text filed',
            'error'
          )
    }
    
}

function getData() {
    usersRef.on('value', function(snapshot) {
        document.getElementById("view_area").innerHTML= "";
        let data =  Object.values(snapshot.val());
        let id = snapshot.key;
        data.forEach(data => {
            console.log(data.id)
            $('#view_area').prepend(`
            <div class="card" onclick="copyToClipboard('#${data.id}')">
                <div class="card-body">  
                    <p id="${data.id}">${data.message.trim()}</p>   
                    <button class="btn btn-danger">x</button>
                </div>
            </div></br>
            `)
        });   
    });
}

function deleteAll(){  
    let refId = database.ref('/');
    refId.remove()
    document.getElementById("view_area").innerHTML= "";
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}


function create_UUID (){
    var dt = new Date().getTime();
    var uuid = 'xxyxxy'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*10)%10 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}