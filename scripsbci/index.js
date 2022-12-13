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


      ws.cell(9, 1).string('state').style(style)
      ws.cell(9, 2).string('acount_id').style(style)
      ws.cell(9, 3).string('credential_id').style(style)

      ws.cell(9, 4).string('trx ID').style(style)
      ws.cell(9, 5).string('trx Amount').style(style)
      ws.cell(9, 6).string('trx Create_at').style(style)
      ws.cell(9, 7).string('trx made_on').style(style)
      ws.cell(9, 8).string('description').style(style)
      ws.cell(9, 9).string('status').style(style)
      ws.cell(9, 10).string('extra_data : Type').style(style)
      ws.cell(9, 11).string('extra_data : Transaction_type').style(style)
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
          ws.cell(9 + index, 1).string(json.data.state ).style(style)          
          ws.cell(9 + index , 2).string(json.data.account_id).style(style)
          ws.cell(9 + index, 3).string(json.data.credential_id).style(style)
          console.log(json.data.transactions?.length)
      if(json.data.transactions.length > 0 ) {
   
      ws.cell(9 + index, 4).string(data.id || 'Vacio').style(style)
      ws.cell(9 + index, 5).number(data.amount).style(style)
      ws.cell(9 + index, 6).string(data.created_at).style(style)
      ws.cell(9 + index, 7).string(data.made_on).style(style)
      ws.cell(9 + index, 8).string(data.description || 'Null' ).style(style)   
      ws.cell(9 + index, 9).string(data.status || 'Null' ).style(style)   
      ws.cell(9 + index, 10).string(data.extra_data.Type || 'Null' ).style(style)   
      ws.cell(9 + index, 11).string(data.extra_data.TransactionType || 'Null' ).style(style)   
      }   
      //   if(data.extra_data){
      //     ws.cell(9 + index, 9).string(data.extra_data.Type || data.extra_data.CurrentFee  || 'empty').style(style)
      //     ws.cell(9 + index, 10).string(data.extra_data.TransactionType || data.extra_data.TotalFee || 'empty').style(style)
      //   }
      // }
      // else{   
      // ws.cell(9 + index, 9).string('Callback').style(style)
      // ws.cell(9 + index, 10).string('Vacio').style(style)
      // }
      //ws.cell(9 + index, 11).string(json.meta.timestamp).style(style)
      //ws.cell(9 + index, 12).string(json.meta.version).style(style) 
      })
    }// del if
    else
    {
      ws.row(10).setHeight(14);          
      ws.cell(10, 1).string(json.data.state ).style(style)
      ws.cell(10, 2).string(json.data.account_id).style(style)
      ws.cell(10 ,3).string(json.data.credential_id).style(style)
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
  const ws2 = wb.addWorksheet('Ctrx.json'); 
  const ws3 = wb.addWorksheet('Dtrx.json');  
  const ws4 = wb.addWorksheet('Etrx.json');  
  
     await read('Atrx.json',ws,style);
     await read('Btrx.json',ws1,style);
     await read('Ctrx.json',ws2,style); 
     await read('Dtrx.json',ws3,style); 
     await read('Etrx.json',ws4,style);     
   //  await read('Gtrx.json',ws7,style);
  
     wb.write(`Excel_trx.xlsx`);  
  
    
}


read2() // Metodo void solo para ejecutar
//read2()