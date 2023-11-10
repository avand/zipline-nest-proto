import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzXAoSyaDi6ddp_mEtx7HJqEwj0ZS8jJE",
  authDomain: "zipline-nest-proto.firebaseapp.com",
  projectId: "zipline-nest-proto",
  storageBucket: "zipline-nest-proto.appspot.com",
  messagingSenderId: "114302018913",
  appId: "1:114302018913:web:fbe6c363c405bf10465120"
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
