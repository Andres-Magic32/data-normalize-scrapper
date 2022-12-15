import { readFile } from 'fs/promises'
import xl from 'excel4node' // Se requiere para crear el excel
import { count } from 'console';

const read = async() => {
    // Obtiendo datos json
    const file = await readFile('./accounts/Aaccount.json', 'utf-8');
    const json = JSON.parse(file)
    // Apartir de aquí solo agrege los json que requiere unificar
    const file_dos = await readFile('./accounts/Baccount.json', 'utf-8');
    const json_dos = JSON.parse(file_dos)
    // const file_tres = await readFile('./accounts/Caccount.json', 'utf-8');
    // const json_tres = JSON.parse(file_tres)
   

    
    // Tome los json y unifique las transacciones para tener un solo objeto de TRXS

     const jsons = [];
     jsons.push(json.data , json_dos.data)
     
   
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Cuentas');
    var style = wb.createStyle({
        font: {
          color: '#323136',
          size: 12,
        },       
      });
      
      /**Asignando medidas de columna */
      ws.column(1).setWidth(50);
      ws.column(2).setWidth(50);
      ws.column(3).setWidth(20);
      ws.column(4).setWidth(20);
      ws.column(5).setWidth(40);
      ws.column(6).setWidth(30);
      ws.column(7).setWidth(30);
      ws.column(8).setWidth(20);
      ws.column(9).setWidth(50);
      ws.column(10).setWidth(30);
      ws.column(11).setWidth(50);
      ws.column(12).setWidth(50);
      ws.row(9).setHeight(15);
      
      
      ws.cell(9, 1).string('ID').style(style)
      ws.cell(9, 2).string('Name').style(style) 
      ws.cell(9, 3).string('Balance').style(style)       
      ws.cell(9, 4).string('number').style(style) 
      ws.cell(9, 5).string('nature').style(style)             
      ws.cell(9, 6).string('Credit Card').style(style) 
      ws.cell(9, 8).string('Available balance').style(style) 
      ws.cell(9, 9).string('Currency').style(style)     
      ws.cell(9, 10).string('client_id').style(style)          
      ws.cell(9, 11).string('state').style(style) 
      ws.cell(9, 12).string('institution').style(style)    
      ws.cell(9, 13).string('Extra Data').style(style)    
      ws.cell(9, 14).string('Extra Data').style(style)
      ws.cell(9, 15).string('Extra Data').style(style)
      ws.cell(9, 16).string('Extra Data').style(style)    
      
      jsons.map((data,index)=> {          
      ws.row(10 + index).setHeight(14);     
      
      let credita_card = data.is_credit_card ? 'credit_card' : 'Not credit card'
      ws.cell(10 + index, 1).string(data.id).style(style)
      ws.cell(10 + index, 2).string(data.name).style(style) 
      ws.cell(10 + index , 3).number(data.balance).style(style) 
      ws.cell(10 + index, 4).string(data.number).style(style) 
      ws.cell(10 + index, 5).string(data.nature).style(style)            
      ws.cell(10 + index, 6).string(credita_card).style(style)  

      const available_balance = data.available_balance === null ? 'null' :   data.available_balance.toString()    
      ws.cell(10 + index, 8).string(available_balance).style(style)     
      ws.cell(10 + index, 9).string(data.currency).style(style)       
      ws.cell(10 + index, 10).string(data.client_id).style(style)
      ws.cell(10 + index, 11).string(data.state).style(style)
      ws.cell(10 + index, 12).string(data.institution).style(style)
      let count = 1;
      for (let key in data.extra_data){
      console.log(key)
       console.log(data.extra_data[key]);
        ws.cell(10 + index, 12 + count).string(
        `${key} : ${data.extra_data[key]}`
        ).style(style)

       count = count + 1;
        }
      })

      // Escribiendo el excel
      wb.write('Excel_accounts.xlsx');
}


read() // Metodo void solo para ejecutar