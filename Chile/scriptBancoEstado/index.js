import { readFile } from 'fs/promises'
import xl from 'excel4node' // Se requiere para crear el excel

const read = async(data,ws,style) => {
  
    const file = await readFile(`./trx/${data}`, 'utf-8');
     const json = JSON.parse(file);

   

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


      ws.cell(9, 1).string('account_id').style(style) 
      ws.cell(9, 2).string('credential_id').style(style) 
      ws.cell(9, 3).string('state').style(style)     
      ws.cell(9, 4).string('institution').style(style)     
      ws.cell(9, 5).string('client_id').style(style)     

      ws.cell(9, 6).string('trx ID').style(style)
      ws.cell(9, 7).string('trx status').style(style)
      ws.cell(9, 8).string('trx made on').style(style)
      ws.cell(9, 9).string('trx amount').style(style)
      ws.cell(9, 10).string('trx description').style(style)
      ws.cell(9, 11).string('trx create_at').style(style)
      ws.cell(9, 12).string('trx extra_data').style(style)
      ws.cell(9, 13).string('trx extra_data').style(style)
      ws.cell(9, 14).string('trx extra_data').style(style)
      ws.cell(9, 15).string('trx extra_data').style(style)
      
      
   
      // ws.cell(9, 9).string('Type || CurrentFee').style(style)
      // ws.cell(9, 10).string('TranscriptionType || TotalFee').style(style)
      // ws.cell(9, 11).string('timestam callback').style(style)
      // ws.cell(9, 12).string('timestam version').style(style)

      //Mapeando los datos en el excel.
      const {transactions} = json.data;
      console.log(transactions.length)
      if(transactions.length > 0){
      transactions.map((data,index)=> {
          index = index + 1;
          
          ws.row(9 + index).setHeight(14);                    
          ws.cell(9 + index , 1).string(json.data.account_id).style(style) 
          ws.cell(9 + index , 2).string(json.data.credential_id).style(style)
          ws.cell(9 + index , 3).string(json.data.state).style(style)
          ws.cell(9 + index , 4).string(json.data.institution).style(style)          
          ws.cell(9 + index , 5).string(json.data.client_id).style(style)          
        
      if(json.data.transactions.length > 0 ) {
        console.log(json.data.transactions.length)
       let debit = data.extra_data.isDebit === true ? 'Debit' : 'Not Debit'
      ws.cell(9 + index, 6).string(data.id || 'Vacio').style(style)
      ws.cell(9 + index, 7).string(data.status).style(style)
      ws.cell(9 + index, 8).string(data.made_on).style(style)
      ws.cell(9 + index, 9).number(data.amount).style(style)
      ws.cell(9 + index, 10).string(data.description || 'Null' ).style(style)   
      ws.cell(9 + index, 11).string(data.create_at || 'Null' ).style(style)       
      
     
      let count = 1;
      for (let key in data.extra_data){
      console.log(key)
       console.log(data.extra_data[key]);
        ws.cell(9 + index, 11 + count).string(
        `${key} : ${data.extra_data[key]}`
        ).style(style)

       count = count + 1;
        }

      }         
      })
    }// del if
    else
    {
      ws.row(10).setHeight(14);               
      ws.cell(10 , 1).string(json.data.account_id).style(style) 
      ws.cell(10 , 2).string(json.data.credential_id).style(style)
      ws.cell(10 , 3).string(json.data.state).style(style)
      ws.cell(10 , 4).string(json.data.institution).style(style)          
      ws.cell(10 , 5).string(json.data.client_id).style(style)          
      
    }
    
      // Escribiendo el excel
      
}

const read2 = async() => {
  
  const trxs = ['Atrx.json','Btrx.json','Ctrx.json','Dtrx.json','Etrx.json','Ftrx.json','gtrx.json','htrx.json']
  //const trxs = ['Atrx.json','Btrx.json'] 
  const wb = new xl.Workbook();
  var style = wb.createStyle({
    font: {
      color: '#323136',
      size: 12,
    },
  });
  const ws = wb.addWorksheet('Atrx.json');
   const ws1 = wb.addWorksheet('Btrx.json');
  // const ws2 = wb.addWorksheet('Ctrx.json'); 
  // const ws3 = wb.addWorksheet('Dtrx.json');  
  // const ws4 = wb.addWorksheet('Etrx.json');  
  
     await read('Atrx.json',ws,style);
    await read('Btrx.json',ws1,style);
    //  await read('Ctrx.json',ws2,style); 
    // //  await read('Dtrx.json',ws3,style); 
    //  await read('Etrx.json',ws4,style);     
   //  await read('Gtrx.json',ws7,style);
  
     wb.write(`Excel_trx.xlsx`);  
  
    
}


read2() // Metodo void solo para ejecutar
//read2()