import { readFile } from 'fs/promises'
import xl from 'excel4node' // Se requiere para crear el excel

const read = async() => {
    // Obtiendo datos json
    const file = await readFile('./accounts/Aaccount.json', 'utf-8');
    const json = JSON.parse(file)
    // Apartir de aquí solo agrege los json que requiere unificar
    const file_dos = await readFile('./accounts/Baccount.json', 'utf-8');
    const json_dos = JSON.parse(file_dos)
    const file_tres = await readFile('./accounts/Caccount.json', 'utf-8');
    const json_tres = JSON.parse(file_tres)
    const file_cuatro = await readFile('./accounts/Daccount.json', 'utf-8');
    const json_cuatro = JSON.parse(file_cuatro)
    const file_cinco = await readFile('./accounts/Eaccount.json', 'utf-8');
    const json_cinco = JSON.parse(file_cinco)
    const file_seis = await readFile('./accounts/Faccount.json', 'utf-8');
    const json_seis = JSON.parse(file_seis)
    const file_siete = await readFile('./accounts/Haccount.json', 'utf-8');
    const json_siete = JSON.parse(file_siete)
    const file_ocho = await readFile('./accounts/Haccount.json', 'utf-8');
    const json_ocho = JSON.parse(file_ocho)

    
    // Tome los json y unifique las transacciones para tener un solo objeto de TRXS

     const jsons = [];
     jsons.push(json , json_dos, json_tres,json_cuatro,json_cinco,json_seis,json_siete,json_ocho)
     
   
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
      ws.cell(9, 4).string('currency').style(style) 
      ws.cell(9, 5).string('number').style(style)       
      ws.cell(9, 6).string('nature').style(style) 
      ws.cell(9, 7).string('Credit Card').style(style) 
      ws.cell(9, 8).string('Available balance').style(style) 
      ws.cell(9, 9).string('AvailableOverdraft').style(style)
      ws.cell(9, 10).string('FinerioProducType').style(style)
      ws.cell(9, 11).string('Credential ID').style(style) 
      ws.cell(9, 12).string('State').style(style)    
      ws.cell(9, 13).string('timestamp').style(style)
      ws.cell(9, 14).string('version').style(style)    
      
      ws.cell(9, 15).string('Credit_detail').style(style) 
      ws.cell(9, 16).string('closing date').style(style) 
      ws.cell(9, 17).string('non_interest_payment').style(style) 
      ws.cell(9, 18).string('statement_balance').style(style) 
      ws.cell(9, 19).string('credit_limit').style(style) 
      ws.cell(9, 20).string('due_date').style(style) 
      ws.cell(9, 21).string('last_closing_date').style(style) 
      ws.cell(9, 22).string('card_number').style(style) 

      //Mapeando los datos en el excel. 
      jsons.map((data,index)=> {   
      // let timeStamp =  data.date;
      //let date_format = new Date(timeStamp);
      // let newdate =  `${date_format.getFullYear()} / ${date_format.getMonth()} / ${date_format.getDay()}  _  ${date_format.getHours()} - ${date_format.getMinutes()}`
       
       
      ws.row(10 + index).setHeight(14);
      const finerio = data.data.extra_data.FinerioProductType
      const finerionerioProduct = `Nombre : ${finerio.Name}, Description : ${finerio.Description}`;
      const availabeOverDraft = data.data.extra_data?.ExtraData?.AvailableOverdraft || 0;
      
      
      let credita_card = data.data.is_credit_card ? 'credit_card' : 'Not credit card'
      ws.cell(10 + index, 1).string(data.data.id).style(style)
      ws.cell(10 + index, 2).string(data.data.name).style(style) 
      ws.cell(10 + index , 3).number(data.data.balance).style(style) 
      ws.cell(10 + index, 4).string(data.data.currency).style(style) 
      ws.cell(10 + index, 5).string(data.data.number).style(style)      
      ws.cell(10 + index, 6).string(data.data.nature).style(style)
      ws.cell(10 + index, 7).string(credita_card).style(style)       
      ws.cell(10 + index, 8).number(data.data.available_balance).style(style)
      ws.cell(10 + index, 9).number(availabeOverDraft).style(style)      
      ws.cell(10 + index, 10).string(finerionerioProduct).style(style)
      ws.cell(10 + index, 11).string(data.data.credential_id).style(style)
      ws.cell(10 + index, 12).string(data.data.state).style(style)
      ws.cell(10 + index, 13).string(data.meta.timestamp).style(style)       
      ws.cell(10 + index, 14).string(data.meta.version).style(style)
       
        
        if(data.data.credit_detail !== null){
          const {credit_detail} = data.data;         
          const last_closing_date = credit_detail.last_closing_date === null ? 'null' : credit_detail.last_closing_date;
          ws.cell(10 + index, 15).string('Yes').style(style) 
          ws.cell(10 + index, 16).string(credit_detail.closing_date).style(style) 
          ws.cell(10 + index, 17).number(credit_detail.non_interest_payment).style(style) 
          ws.cell(10 + index, 18).number(credit_detail.statement_balance).style(style) 
          ws.cell(10 + index, 19).number(credit_detail.credit_limit).style(style) 
          ws.cell(10 + index, 20).string(credit_detail.due_date).style(style) 
          ws.cell(10 + index, 21).string(last_closing_date || null).style(style) 
          ws.cell(10 + index, 22).string(credit_detail.card_number).style(style) 
        }else{
          ws.cell(10 + index, 15).string('Not').style(style) 
        }
      })

      // Escribiendo el excel
      wb.write('Excel_accounts.xlsx');
}


read() // Metodo void solo para ejecutar