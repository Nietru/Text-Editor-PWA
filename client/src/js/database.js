import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to the database");

  // Creates a connection to the database and the version to be used
  const editorDb = await openDB("jate", 1);

  // Creates transaction and specifies the database and data privileges
  const tx = editorDb.transaction("jate", "readwrite");

  // Open desired object store
  const store = tx.objectStore("jate");

  //  stores and passes in the content
  const request = store.put({ id: 1, value: content });

  // confirmation of the request
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Creates a connection to the database and the version to be used
  const editorDb = await openDB("jate", 1);

  // Creates transaction and specifies the database and data privileges
  const tx = editorDb.transaction("jate", "readonly");

  // Open desired object store
  const store = tx.objectStore("jate");

  // Gets all data in the database
  const request = store.getAll();

  // Gets confirmation of request
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
