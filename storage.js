import { initializeApp } from "firebase/app";
import { getStorage, ref, list, listAll } from "firebase/storage";

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

//? Initialize Cloud Storage and get a reference to the service
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

//? Criar uma referência
// Create a storage reference from our storage service
const storageRef = ref(storage);

//* Para criar uma referência a um local inferior da árvore, como 'images/space.jpg', transmita esse caminho como um segundo argumento ao chamar ref().
// Create a child reference
const imagesRef = ref(storage, "images");
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, "images/space.jpg");
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"

//? Navegar com referências
//* Também é possível usar as propriedades parent e root para navegar até uma posição superior da hierarquia de arquivos.
//* O método parent navega até um nível acima, enquanto que root navega até o topo.
// Parent allows us to move to the parent of a reference
const imageRef = spaceRef.parent;
// imagesRef now points to 'images'

// Root allows us to move all the way back to the top of our bucket
const rootRef = spaceRef.root;
// rootRef now points to the root

//? Propriedades de referência
//* Você pode inspecionar referências para entender melhor os arquivos aos quais elas apontam usando as propriedades fullPath, name e bucket.
//* Essas propriedades recebem o caminho completo e o nome do arquivo, além do bucket em que ele está armazenado.
// Reference's path is: 'images/space.jpg'
// This is analogous to a file path on disk
spaceRef.fullPath;

// Reference's name is the last segment of the full path: 'space.jpg'
// This is analogous to the file name
spaceRef.name;

// Reference's bucket is the name of the storage bucket where files are stored
spaceRef.bucket;

//? Fazer upload de arquivos
//* Para fazer upload de um arquivo para o Cloud Storage, primeiro crie uma referência ao caminho completo do arquivo, incluindo o nome dele.
// Create a root reference
const storage1 = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage1, "mountains.jpg");

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage1, "images/mountains.jpg");

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name; // true
mountainsRef.fullPath === mountainImagesRef.fullPath; // false

//? Excluir um arquivo
// Create a reference to the file to delete
const desertRef = ref(storage, "images/desert.jpg");

// Delete the file
deleteObject(desertRef)
  .then(() => {
    // File deleted successfully
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });

//? Listar todos os arquivos
// Create a reference under which you want to list
const listRef = ref(storage, "files/uid");

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });
