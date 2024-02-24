import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('citydb.db')

export const initDB = () => {
    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS cities (id INTEGER PRIMARY KEY NOT NULL, name TEXT, country TEXT, latitude REAL, longitude REAL);",
            [],
            ()=>console.log("citydb created"),
            (_,error)=>console.log(error)
        )
    })
}

export const insertCityData = (name, country, latitude, longitude) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cities (name, country, latitude, longitude) VALUES (?, ?, ?, ?);",
        [name, country, latitude, longitude],
        () => console.log(`City data ${name},${country},${latitude},${longitude} inserted successfully`),
        (_, error) => console.log('Insert error', error)
      );
    });
}

export const insertCityData1 = (name, country, latitude, longitude) => {
  return new Promise((resolve,reject)=>{
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(id) as count FROM cities;",
        [],
        (_,{rows}) => {
          const count = rows._array[0].count;
          console.log("current city number is ", count)

          if(count>=4){
            reject("Can only save 4 cities, please delete one first!")
          }else{
            tx.executeSql(
              "INSERT INTO cities (name, country, latitude, longitude) VALUES (?, ?, ?, ?);",
              [name, country, latitude, longitude],
              () => resolve(`City data ${name},${country},${latitude},${longitude} inserted successfully`),
              (_, error) => reject('Insert error', error)
            )
          }
        },
        (_,error) => reject("'count fetch error", error.message)
      );
    });
  })
}



export const fetchCities = async () => {
  return new Promise((resolve,reject)=>{
    db.transaction(tx=>{
      tx.executeSql(
        "SELECT * FROM cities;",
        [],
        (_,{rows:{_array}})=>{
          console.log("Get all cities in expo sqlite",_array)
          resolve(_array);
        }),
        (_,err)=>{
          console.log("Fetch failed: ",err)
          reject(err)
        }
    });
    })
};

export const deleteCityData = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM cities WHERE id = ?;",
      [id],
      () => console.log(`City data with id ${id} deleted successfully`),
      (_, error) => console.log('Delete error', error)
    );
  });
};