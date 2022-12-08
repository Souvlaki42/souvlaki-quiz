import { getFirestore, collection, addDoc, getDoc, doc, getDocs, DocumentData, onSnapshot, QuerySnapshot, query, orderBy, OrderByDirection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAgX6AMR2n2fBYFS9MqM-evTWGpjWxoRt8",
    authDomain: "souvlaki-quiz-34b9c.firebaseapp.com",
    projectId: "souvlaki-quiz-34b9c",
    storageBucket: "souvlaki-quiz-34b9c.appspot.com",
    messagingSenderId: "382767981430",
    appId: "1:382767981430:web:8a1bf8eb3cea85842a5057"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addDocument = async (table: string, data: object) => {
    if (!table || !data) return null;
    let error;
    const document = await addDoc(collection(db, table), data).catch(err => error = err);
    return { document, error };
}

export const getDocument = async (table: string, id: string) => {
    if (!table || !id) return null;
    const document = await getDoc(doc(db, table, id));
    if (!document.exists()) return null;
    else return document.data();
}

export const getDocuments = async (table: string, order: OrderByDirection | null) => {
    if (!table) return null;
    let snapshot: QuerySnapshot<DocumentData>
    const referenceTable = collection(db, table);
    if (!order) {
        snapshot = await getDocs(referenceTable);
    } else {
        const queryObject = query(referenceTable, orderBy("highscore", order));
        snapshot = await getDocs(queryObject);
    }
    return snapshot.docs.map(doc => doc.data());
}