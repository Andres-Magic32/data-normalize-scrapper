import { readFile } from 'fs/promises' 

import xl from 'excel4node' // Se requiere para crear el excel
//Comentarios de otro usuario
const read = async() => {
    // Obtiendo datos json
    const file = await readFile('./TRX_uno.json', 'utf-8');
    const json = JSON.parse(file)
    // Apartir de aquí solo agrege los json que requiere unificar
    const file_dos = await readFile('./TRX_dos.json', 'utf-8');
    const json_dos = JSON.parse(file_dos)
    const file_tres = await readFile('./TRX_03.json', 'utf-8');
    const json_tres = JSON.parse(file_tres)
    
    // Tome los json y unifique las transacciones para tener un solo objeto de TRXS
    let jsons = json.data.transactions.concat(json_dos.data.transactions, json_tres.data.transactions)    
    

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');
    var style = wb.createStyle({
        font: {
          color: '#323136',
          size: 14,
        },       
      });
      
      /**Asignando medidas de columna */
      ws.column(1).setWidth(50);
      ws.column(2).setWidth(60);
      ws.column(3).setWidth(45);
      ws.column(4).setWidth(25);
      ws.column(5).setWidth(30);
      ws.column(6).setWidth(30);
      ws.column(7).setWidth(80);
      ws.column(8).setWidth(10);
      ws.column(9).setWidth(10);
      ws.column(10).setWidth(15);
      ws.column(11).setWidth(45);
      ws.column(12).setWidth(15);
      ws.row(9).setHeight(30);
      
      
      ws.cell(9, 1).string('State').style(style)
      ws.cell(9, 2).string('Account_id').style(style) 
      ws.cell(9, 3).string('Credential_id').style(style) 
      ws.cell(9, 4).string('TRX_id').style(style) 
      ws.cell(9, 5).string('Unique_id').style(style) 
      ws.cell(9, 6).string('create_at').style(style) 
      ws.cell(9, 7).string('description').style(style) 
      ws.cell(9, 8).string('status').style(style) 
      ws.cell(9, 9).string('Is charge').style(style) 
      ws.cell(9, 10).string('Amount').style(style) 
      ws.cell(9, 11).string('Comentarios').style(style) 
      ws.cell(9, 12).string('Is Wrong?').style(style) 

      //Mapeando los datos en el excel. 
      jsons.map((data,index)=> {        
       index = index + 1    
      ws.row(9 + index).setHeight(80);
      ws.cell(9 + index, 1).string(json.data.state).style(style)
      ws.cell(9 + index, 2).string(json.data.account_id).style(style) 
      ws.cell(9 + index , 3).string(json.data.credential_id).style(style) 
      ws.cell(9 + index, 4).string(data.id).style(style) 
      ws.cell(9 + index, 5).string(data.extra_data.UniqueId).style(style)      
      ws.cell(9 + index, 6).string(data.created_at).style(style) 
      ws.cell(9 + index, 7).string(data.description).style(style) 
      ws.cell(9 + index, 8).string(data.status).style(style) 
      ws.cell(9 + index, 9).string(String(data.extra_data.IsCharge)).style(style) 
      ws.cell(9 + index , 10).number(data.amount).style(style) 
         
      })

      // Escribiendo el excel
      wb.write('Excel.xlsx');
}

/**
 * Funcion de otro usuario : ted - Cambios pa luego
 */
const other = () => {
  console.log('saludos')
}
read() // Metodo void solo para ejecutar
 /**
  * Se agrega desde la otra rama
  */
other();

const test = () => {
  // Se agrega desde test3-qa
}

const test2 = () => {
  // since branch rebase feature/test3-qa-rebase
}
