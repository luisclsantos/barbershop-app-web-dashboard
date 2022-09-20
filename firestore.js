import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

//? Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//! TIPOS DE DADOS FIRESTORE [START]
//? Tipos de dados
const docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo",
    },
  },
};
await setDoc(doc(db, "data", "one"), docData);
//! TIPOS DE DADOS FIRESTORE [END]

//! ADICIONAR DADOS AO FIRESTORE [START]
//? Adicionar dados
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

//? Adicionar um novo documento a coleção "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
});

//? Adicionar novos campos a um documento
const cityRef = doc(db, "cities", "BJ");
setDoc(cityRef, { capital: true }, { merge: true });

//? Objetos personalizados
class City {
  constructor(name, state, country) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ", " + this.state + ", " + this.country;
  }
}

//Firestore data converter
const cityConverter = {
  toFirestore: (city) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};

// Set with cityConverter
const ref = doc(db, "cities", "LA").withConverter(cityConverter);
await setDoc(ref, new City("Los Angeles", "CA", "USA"));

//? Adicionar um documento usando o objeto
await setDoc(doc(db, "cities", "new-city-id"), data);

//? Adicionar um novo documento com um id gerado pelo próprio Firebase
const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan",
});
console.log("Document written with ID: ", docRef.id);

//? Armazenar a referencia de uma collection para usar mais tarde
// Add a new document with a generated id
const newCityRef = doc(collection(db, "cities"));
// later...
await setDoc(newCityRef, data);
//! ADICIONAR DADOS AO FIRESTORE [END]

//! ATUALIZAR DADOS DO FIRESTORE [START]
//? Atualizar um documento
const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true,
});

//Carimbo de data/hora do servidor
const docRefServerTimestamp = doc(db, "objects", "some-id");

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
  timestamp: serverTimestamp(),
});

//? Atualizar campos em objetos aninhados
//A notação por pontos permite que você atualize um único campo aninhado sem substituir outro campo aninhado.
//Se você atualizar um campo aninhado sem a notação por pontos, todo o campo mapa será substituído.

// Create an initial document to update.
const frankDocRef = doc(db, "users", "frank");
await setDoc(frankDocRef, {
  name: "Frank",
  favorites: { food: "Pizza", color: "Blue", subject: "recess" },
  age: 12,
});

// To update age and favorite color:
await updateDoc(frankDocRef, {
  age: 13,
  "favorites.color": "Red",
});

//? Atualizar elementos em uma matriz
// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
  regions: arrayUnion("greater_virginia"),
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
  regions: arrayRemove("east_coast"),
});

//? Aumentar um valor numérico
// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
  population: increment(50),
});
//! ATUALIZAR DADOS DO FIRESTORE [END]

//! LER DADOS DO FIRESTORE [START]
//* Dados de exemplo
const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
  name: "San Francisco",
  state: "CA",
  country: "USA",
  capital: false,
  population: 860000,
  regions: ["west_coast", "norcal"],
});
await setDoc(doc(citiesRef, "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
  capital: false,
  population: 3900000,
  regions: ["west_coast", "socal"],
});
await setDoc(doc(citiesRef, "DC"), {
  name: "Washington, D.C.",
  state: null,
  country: "USA",
  capital: true,
  population: 680000,
  regions: ["east_coast"],
});
await setDoc(doc(citiesRef, "TOK"), {
  name: "Tokyo",
  state: null,
  country: "Japan",
  capital: true,
  population: 9000000,
  regions: ["kanto", "honshu"],
});
await setDoc(doc(citiesRef, "BJ"), {
  name: "Beijing",
  state: null,
  country: "China",
  capital: true,
  population: 21500000,
  regions: ["jingjinji", "hebei"],
});

//? Ler um único documento
//No exemplo a seguir, é demonstrado como recuperar o conteúdo de um único documento usando get():
const docReference = doc(db, "cities", "SF");
const docSnap = await getDoc(docReference);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

//? Ler Objetos personalizados
class City {
  constructor(name, state, country) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ", " + this.state + ", " + this.country;
  }
}

// Firestore data converter
const cityConvert = {
  toFirestore: (city) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};

const reference = doc(db, "cities", "LA").withConverter(cityConvert);

const docSnapshot = await getDoc(reference);
if (docSnapshot.exists()) {
  // Convert to City object
  const city = docSnapshot.data();
  // Use a City instance method
  console.log(city.toString());
} else {
  console.log("No such document!");
}

//? Ler vários documentos de uma coleção
//Também é possível recuperar vários documentos com uma solicitação, basta consultar os documentos em uma coleção.
//Por exemplo, use where() para consultar todos os documentos que atendam a uma determinada condição e use get() para recuperar os resultados:
const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshotWithWhere = await getDocs(q);
querySnapshotWithWhere.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

//Além disso, é possível recuperar todos os documentos de uma coleção, basta omitir o filtro where() completamente:
const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

//? Receber atualizações em tempo real com o Cloud Firestore
const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
  console.log("Current data: ", doc.data());
});

//? Detectar vários documentos em uma coleção
const query = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(
  query,
  (snapshot) => {
    const cities = [];
    snapshot.forEach((doc) => {
      cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  },
  (error) => {
    // ...
  }
);

//? Referencia de um Document
const documentRef = doc(db, "collection", "doc");
const documentRefPath = doc(db, "collection/doc");

//? Referência de uma Collection
const collectionRef = collection(db, "collection");

//? Referência de uma SubCollection
const subCollectionRef = doc(db, "collection", "doc", "subcollection", "doc");
//! LER DADOS DO FIRESTORE [END]

//! EXCLUIR DADOS DO FIRESTORE [START]
//? Excluir documentos
await deleteDoc(doc(db, "cities", "DC"));

//? Excluir campos
const cityReference = doc(db, "cities", "BJ");

// Remove the 'capital' field from the document
await updateDoc(cityReference, {
  capital: deleteField(),
});

//? Excluir coleções
//* Deleting collections from a Web client is not recommended.

//! EXCLUIR DADOS DO FIRESTORE [END]

//! Operadores de consulta Firebase
//O método where() usa três parâmetros: um campo para filtrar, um operador de comparação e um valor.
//O Cloud Firestore oferece suporte aos seguintes operadores de comparação:
//* < menor que
//* <= menor que ou igual a
//* == igual a
//* > maior que
//* >= maior que ou igual a
//* != diferente de
//* array-contains
//* array-contains-any
//* in
//* not-in

//! Ordenar e limitar dados com o Cloud Firestore
//Por exemplo, para consultar as três primeiras cidades em ordem alfabética, use:
const q1 = query(citiesRef, orderBy("name"), limit(3));

//Para ver as três últimas cidades, classifique em ordem decrescente:
const q2 = query(citiesRef, orderBy("name", "desc"), limit(3));

//Além disso, também é possível ordenar por vários campos.
//Por exemplo, se você quiser ordenar por estado e, dentro de cada estado ordenar por população em ordem decrescente:
const q3 = query(citiesRef, orderBy("state"), orderBy("population", "desc"));

//É possível combinar filtros where() com orderBy() e limit().
//No exemplo a seguir, as consultas definem um limite para população,
//ordenam por esse valor em ordem crescente e retornam apenas os primeiros resultados que excedem o limite:
const q4 = query(
  citiesRef,
  where("population", ">", 100000),
  orderBy("population"),
  limit(2)
);
