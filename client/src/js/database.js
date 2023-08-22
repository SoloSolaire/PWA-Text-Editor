import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('putting to db');
  
  const db = await openDB('jate', 1);

  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result + "; saved to db");
};

export const getDb = async () => {
  console.error('getDb not implemented');
const db = await openDB("jate" , 1);
const tx = db.transaction("jate", "readonly");
const store = tx.objectStore("jate");
const request = store.get(1);
const result = await request;

if (result) {
  console.log('data obtained :)', result.value);
  return result.value;
} else {
  console.log('not found in db :(');
}
};

initdb();
