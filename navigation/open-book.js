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
var $select_local_diary = $("#select-local-diary");
var $select_local_period = $("#select-local-period");
var $select_pro_diary = $("#select-pro-diary");
var $select_pro_period = $("#select-pro-period");
var $select_pattern_diary = $("#select-pattern-diary");
var $select_pattern_period = $("#select-pattern-period");

//? Fields Values Vars
let local,
  professional,
  date,
  pattern = "";

//? Função para carregar os dados iniciais
function getData() {
  //* Carregando Dados das Barbearias

  db.collection("barbershops")
    .get()
    .then(
      (snapshots) => {
        snapshots.forEach((doc) => {
          //Inserindo as opções nos Dropdowns
          $select_local_diary.append(
            $("<option />").val(doc.id).text(doc.data().name)
          );
          $select_local_period.append(
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

//? Listener Dropdown select_local_diary
$select_local_diary.on("change", function () {
  var selected_local_diary = this.value;
  local = selected_local_diary;

  $select_pro_diary.empty();
  $select_pattern_diary.empty();
  $select_pro_diary.append($("<option />").val("").text(""));
  $select_pattern_diary.append($("<option />").val("").text(""));

  if (selected_local_diary == "") {
    console.log("É necessário selecionar um valor");
  } else {
    db.collection("barbershops")
      .doc(selected_local_diary)
      .collection("professionals")
      .get()
      .then(
        (snapshots) => {
          snapshots.forEach((doc) => {
            //Inserindo as opções nos Dropdowns
            $select_pro_diary.append(
              $("<option />").val(doc.id).text(doc.data().name)
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );

    db.collection("barbershops")
      .doc(selected_local_diary)
      .collection("patterns")
      .get()
      .then(
        (snapshots) => {
          snapshots.forEach((doc) => {
            //Inserindo as opções nos Dropdowns
            $select_pattern_diary.append(
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

//? Listener Dropdown select_local_period
$select_local_period.on("change", function () {
  var selected_local_period = this.value;

  local = selected_local_period;

  $select_pro_period.empty();
  $select_pattern_period.empty();
  $select_pro_period.append($("<option />").val("").text(""));
  $select_pattern_period.append($("<option />").val("").text(""));

  if (selected_local_period == "") {
    console.log("É necessário selecionar um valor");
  } else {
    db.collection("barbershops")
      .doc(selected_local_period)
      .collection("professionals")
      .get()
      .then(
        (snapshots) => {
          snapshots.forEach((doc) => {
            //Inserindo as opções nos Dropdowns
            $select_pro_period.append(
              $("<option />").val(doc.id).text(doc.data().name)
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );

    db.collection("barbershops")
      .doc(selected_local_period)
      .collection("patterns")
      .get()
      .then(
        (snapshots) => {
          snapshots.forEach((doc) => {
            //Inserindo as opções nos Dropdowns
            $select_pattern_period.append(
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

//? Listener Dropdown select_pro_diary
$select_pro_diary.on("change", function () {
  var selected_pro_diary = this.value;

  professional = selected_pro_diary;
});

//? Listener Dropdown select_pro_period
$select_pro_period.on("change", function () {
  var selected_pro_period = this.value;

  professional = selected_pro_period;
});

//? Listener Dropdown select_pattern_diary
$select_pattern_diary.on("change", function () {
  var select_pattern_diary = this.value;

  pattern = select_pattern_diary;
});

//? Listener Dropdown select_pattern_period
$select_pattern_period.on("change", function () {
  var select_pattern_period = this.value;

  pattern = select_pattern_period;
});

$("#diary-form").on("bouncerFormValid", function () {
  var date = $("#pc-datepicker-1").val();
  const [day, month, year] = date.split("/");
  const new_date = new Date(+year, +month - 1, +day);
  data = date.replace(/\//g, "");

  const ref = db
    .collection("barbershops")
    .doc(local)
    .collection("professionals")
    .doc(professional)
    .collection("book")
    .doc(data);

  ref
    .set({
      date: firebase.firestore.Timestamp.fromDate(new Date(new_date)),
      isAvailable: true,
      writtenDate: date,
    })
    .then(() => {
      console.log("Document Date Book successfully written!");

      db.collection("barbershops")
        .doc(local)
        .collection("patterns")
        .doc(pattern)
        .collection("hours")
        .get()
        .then(
          (snapshots) => {
            snapshots.forEach((doc) => {
              ref
                .collection("hours")
                .add(doc.data())
                .then(() => {
                  console.log("Document Hour Book successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing hour book doc: ", error);
                });
            });
          },
          (error) => {
            console.log(error);
          }
        );
    })
    .catch((error) => {
      console.error("Error writing date book doc: ", error);
    });
});

//* Função para preencher um array de datas de acordo com o período indicado (data inicial e data final)
function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

$("#period-form").on("bouncerFormValid", function () {
  start_date = $("#start-date").val();
  const [start_day, start_month, start_year] = start_date.split("/");
  const new_start_date = new Date(+start_year, +start_month - 1, +start_day);

  end_date = $("#end-date").val();
  const [end_day, end_month, end_year] = end_date.split("/");
  const new_end_date = new Date(+end_year, +end_month - 1, +end_day);

  const dates = dateRange(new_start_date, new_end_date);

  dates.forEach((date) => {
    let data = date.toLocaleDateString().replace(/\//g, "");

    const ref = db
      .collection("barbershops")
      .doc(local)
      .collection("professionals")
      .doc(professional)
      .collection("book")
      .doc(data);

    ref
      .set({
        date: firebase.firestore.Timestamp.fromDate(new Date(date)),
        isAvailable: true,
        writtenDate: date.toLocaleDateString(),
      })
      .then(() => {
        console.log("Document Date Book successfully written!");

        db.collection("barbershops")
          .doc(local)
          .collection("patterns")
          .doc(pattern)
          .collection("hours")
          .get()
          .then(
            (snapshots) => {
              snapshots.forEach((doc) => {
                ref
                  .collection("hours")
                  .add(doc.data())
                  .then(() => {
                    console.log("Document Hour Book successfully written!");
                  })
                  .catch((error) => {
                    console.error("Error writing hour book doc: ", error);
                  });
              });
            },
            (error) => {
              console.log(error);
            }
          );
      })
      .catch((error) => {
        console.error("Error writing date book doc: ", error);
      });
  });
});
