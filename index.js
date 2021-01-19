const msg = document.getElementById("message");
const submit = document.getElementById("btn-add");

const database = firebase.database();
const usersRef = database.ref('/');

function writeData(){
    let uid = create_UUID();
    if (msg.value != ""){
        usersRef.child(uid).set({
        message: msg.value,
        id : uid
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
            let pText = `<p class="h6 d-inline" id="${data.id}">${data.message.trim()}</p>`;
            let aText = `<a class="h6 d-inline" href="${data.message.trim()}" id="${data.id}">${data.message.trim()}</a>`;
            $('#view_area').prepend(`
            <div class="card" onclick="copyToClipboard('#${data.id}')">
                <div class="card-body "> 
                    ${
                        linkCheck(data.message) == true ? pText : aText
                      
                    } 
                      
                    <button type="button" class="btn btn-danger float-end d-inline mt-3" onclick="deleteMsg('${data.id}')" aria-label="Close"><i class="fas fa-trash"></i> </button>
                </div>
            </div></br>
            `)
        });   
    });
}

function deleteMsg(id){  
    let refId = database.ref('/'+ id);
    refId.remove()
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
        dt = Math.floor(dt/10);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function linkCheck(str) {
    var patt = /^(http|https|www|)/g;
    return str.match(patt) == "" ?  true : false;
  }