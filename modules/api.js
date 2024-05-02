import { db_getDataFromTableModule } from './db.js'

export const get_getPubs = async (req, res) => {//вызывать процедуру поиска пабов
    // let data = await getPubs()
    console.log(req.query)

    let data;
    await db_getDataFromTableModule('pubs_srb_bg').then(response => data = response);
    console.log(data)
    
    res.json(data)
}



export const post_getPubs = async (req, res) => {//вызывать процедуру поиска пабов
    // let data = await getPubs()
    console.log(req.query)
    res.json(0)
}

