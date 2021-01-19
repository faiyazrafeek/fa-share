
const msg = document.getElementById("message");
const submit = document.getElementById("btn-add");

const database = firebase.database();
const usersRef = database.ref('/');

function writeData(){
    $('#view_area').html = '';
    if (msg.value != ""){
        const autoId = usersRef.push().key
        usersRef.push().set({
        message: msg.value
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
        let data =  Object.values(snapshot.val());
        data.forEach(data => {
            $('#view_area').prepend(`
            <div class="card">
                <div class="card-body">               
                    <p>${data.message}</p>           
                </div>
            </div></br>
            `)
        });   
    });
}


