import mysql from 'mysql';

// Настройки для подключения к базе данных MySQL
const connectionConfig = {
    host: '******',
    user: '******',
    password: '******',
    database: '******',
};

// Функция для создания соединения с базой данных
async function createConnection() {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('DB OK')
    return connection;
}

// Функция для получения данных из таблицы
function getDataFromTableModule(tableName) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        connection.connect(err => {
            if (err) {
                console.log(err);
                console.log('DB ERROR');
                reject(err);
            }
        });

        let query;
        if (!tableName) {
            query = 'SELECT * FROM pubs_srb_bg'
        } else {
            query = `SELECT * FROM ${tableName}`;
        }

        connection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                console.log('DB ERROR');
                reject(err);
            } else {
                resolve(rows);
            }
        });

        connection.end();
    });
}


export async function db_createConnection(){createConnection().
    then(() => {
        console.log('DB OK')
    }).catch(error => {
        console.log('DB ERROR', error)
    });
}

export async function db_getDataFromTableModule(tableName) { 
    return getDataFromTableModule(tableName)
    .then(rows => rows.length > 0 ? rows : null)
    .catch(error => {
        console.log('DB ERROR', error);
        return null;
    });
}

