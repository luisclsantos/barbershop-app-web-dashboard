//? Firebase App Config
const firebaseConfig = {
  apiKey: "AIzaSyBT5jtHY-nYLHQAEDH4LlEKn3VxKettPcg",
  authDomain: "barbearia-real.firebaseapp.com",
  databaseURL: "https://barbearia-real.firebaseio.com",
  projectId: "barbearia-real",
  storageBucket: "barbearia-real.appspot.com",
  messagingSenderId: "204987519318",
  appId: "1:204987519318:web:463e0cd0a20d6c7f3a06f7",
  measurementId: "G-578P8B9G6X",
};

//? Initialize Firebase
firebase.initializeApp(firebaseConfig);

//? Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//? Dropdowns
var $select_local_edit = $("#select-local-edit");
var $select_pro_edit = $("#select-pro-edit");

//? Fields Values Vars
let local,
  localName,
  professional,
  proName,
  date = "";

//? Função para carregar os dados iniciais
function getData() {
  //* Carregando Dados das Barbearias

  db.collection("barbershops")
    .get()
    .then(
      (snapshots) => {
        snapshots.forEach((doc) => {
          //Inserindo as opções nos Dropdowns
          $select_local_edit.append(
            $("<option />").val(doc.id).text(doc.data().name)
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );

  //* Carregando Dados das Barbearias
}

//? Chamada da função que lê os Dados ao carregar a tela
window.onload(getData());

//? Listener Dropdown select_local_edit
$select_local_edit.on("change", function () {
  var select_local_edit = this.value;
  local = select_local_edit;
  localName = $("#select-local-edit option:selected").text();

  $select_pro_edit.empty();
  $select_pro_edit.append($("<option />").val("").text(""));

  if (select_local_edit == "") {
    console.log("É necessário selecionar um valor");
  } else {
    db.collection("barbershops")
      .doc(select_local_edit)
      .collection("professionals")
      .get()
      .then(
        (snapshots) => {
          snapshots.forEach((doc) => {
            //Inserindo as opções nos Dropdowns
            $select_pro_edit.append(
              $("<option />").val(doc.id).text(doc.data().name)
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
});

//? Listener Dropdown select_pro_edit
$select_pro_edit.on("change", function () {
  var select_pro_edit = this.value;

  professional = select_pro_edit;
  proName = $("#select-pro-edit option:selected").text();
});

function updateColumns() {
  try {
    datatable.columns().show(visible);
    datatable.columns().hide(hidden);
  } catch (e) {
    console.log(e);
  }
}

$("#edit-book-form").on("bouncerFormValid", function () {
  var date = $("#pc-datepicker-1").val();
  data = date.replace(/\//g, "");

  $("#pc-dt-methods > tbody:last-child").empty();

  const reference = db
    .collection("barbershops")
    .doc(local)
    .collection("professionals")
    .doc(professional)
    .collection("book")
    .doc(data)
    .collection("hours");

  reference.get().then(
    (snapshots) => {
      snapshots.forEach((doc) => {
        //Inserindo os registros na tabela
        $("#pc-dt-methods > tbody:last-child").append(
          `<tr>
           <td>${doc.data().hour}</td>
           <td>${doc.data().isAvailable ? "Disponível" : "Reservado"}</td>
           <td><button class="btn  btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">Forms</button>
       <div class="dropdown-menu" style="max-width: 15rem;">
           <form class="px-4 py-3">
               <div class="mb-3">
                   <label for="exampleDropdownFormEmail1" class="form-label">Email
                       address</label>
                   <input type="email" class="form-control" id="exampleDropdownFormEmail1"
                       placeholder="email@example.com">
               </div>
               <div class="mb-3">
                   <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                   <input type="password" class="form-control" id="exampleDropdownFormPassword1"
                       placeholder="Password">
               </div>
               <div class="mb-3">
                   <div class="form-check">
                       <input type="checkbox" class="form-check-input" id="dropdownCheck">
                       <label class="form-check-label" for="dropdownCheck">
                           Remember me
                       </label>
                   </div>
               </div>
               <button type="submit" class="btn btn-light-primary btn-sm">Sign in</button>
               <button type="submit" class="btn btn-light-danger btn-sm">Cancel</button>
           </form>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item" href="#">New around here? Sign up</a>
           <a class="dropdown-item" href="#">Forgot password?</a>
       </div><button class="btn btn-primary btn-sm ms-3" data-row="${
         doc.id
       }">Editar</button>
           <button class="btn btn-primary btn-sm ms-3" data-row="${
             doc.id
           }">Remover</button></td>
           <td>${date}</td>
           <td>${proName}</td>
           <td>${localName}</td>
           </tr>`
        );
      });
    },
    (error) => {
      console.log(error);
    }
  );
});
