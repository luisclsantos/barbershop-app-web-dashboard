import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth();

//Get Current User
const user = auth.currentUser;

//Criar um novo usuário com email e senha
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

//Signin Auth
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

//Signout Auth
signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });

//Controlar os estatos de authenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//Acessar os dados de um usuário
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}

//Atualizar os dados de um usuário
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg",
})
  .then(() => {
    // Profile updated!
    // ...
  })
  .catch((error) => {
    // An error occurred
    // ...
  });

//Atualizar email de um usuário
updateEmail(auth.currentUser, "user@example.com")
  .then(() => {
    // Email updated!
    // ...
  })
  .catch((error) => {
    // An error occurred
    // ...
  });

//Atualziar senha de um usuário
const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword)
  .then(() => {
    // Update successful.
  })
  .catch((error) => {
    // An error ocurred
    // ...
  });

//Deletar um usuário
deleteUser(user)
  .then(() => {
    // User deleted.
  })
  .catch((error) => {
    // An error ocurred
    // ...
  });
