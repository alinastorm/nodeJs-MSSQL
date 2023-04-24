import { ConnectionPool } from 'mssql';
import * as sql from 'mssql';
import { ObjectId } from 'mongodb';


const pool = new ConnectionPool({
    user: 'nodeJs',
    password: 'Itktr234',
    server: 'localhost',
    database: 'myTest',
    options: {
        trustServerCertificate: true
    }
});

async function createUsersTable(): Promise<any> {
    try {
        await pool.connect();
        let result = await pool.request()
            .query(`
            CREATE TABLE users(
                id CHAR(24) PRIMARY KEY,
                login VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                );
            `)
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
async function dropeUsersTable(): Promise<any> {
    try {
        await pool.connect();
        let result = await pool.request()
            .query(`
            DROP TABLE users;
            `)
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
async function addUser(login: string, password: string): Promise<any> {
    try {
        await pool.connect();
        let result = await pool.request()
            .input('id', sql.Char(24), new ObjectId().toString())
            .input('login', sql.VarChar(50), login)
            .input('password', sql.VarChar(50), password)
            .output('insertedId', sql.Int)
            .query(`INSERT INTO users (id,login, password) OUTPUT INSERTED.id AS id VALUES (@id,@login, @password)`)

        const { id } = result.recordset[0]
        console.log(result.recordset[0]);

        console.log("ObjectId.isValid(id):", ObjectId.isValid(id));


        return result.recordset[0];
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
async function getUserById(id: string): Promise<any> {
    try {
        await pool.connect();
        let result = await pool.request()
            .input('id', sql.Char(24), id)
            .query('select * from users where id = @id')

        console.log(result.recordset[0]);
        return result.recordset[0];
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
async function getUsersProcedure(procedure: string): Promise<any> {
    try {
        await pool.connect();

        let result = await pool.request()
            // .input('login', sql.VarChar(50), login)
            // .input('password', sql.VarChar(50), password)
            // .output('output_parameter', sql.VarChar(50))
            .execute(procedure)
        console.dir(result.recordset);
        return result.recordset[0];
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}
async function getUserByIdProcedure(id: string): Promise<any> {
    try {
        await pool.connect();

        let result = await pool.request()
            .input('user_id', sql.Char(24), id)
            // .input('password', sql.VarChar(50), password)
            // .output('output_parameter', sql.VarChar(50))
            .execute('get_user_by_id')
        console.dir(result.recordset);
        return result.recordset[0];
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}

// dropeUsersTable()
// createUsersTable()
// addUser('john2', 'password123')
//     .then((insertedUser: any) => {
//         console.log('Inserted user:', insertedUser);
//     });

// getUserById('6446846f9387df8ed69a77a1')
// getUserById('6446856a0419315e2f83b571')
// getUsersProcedure('get_users')
getUserByIdProcedure('6446856a0419315e2f83b571')
