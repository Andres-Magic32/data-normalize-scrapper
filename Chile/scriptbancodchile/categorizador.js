import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.',import.meta.url));
const ruta = path.join(__dirname,'./dataCB.json');
/**
 * Transformación de datos a categorizador. 
 */
const readJsonFile = async () => {
    const data = await fs.readFile(ruta);
   const objetData = JSON.parse(data);
   const {transactions} = objetData;   
   return transactions;
}

const normalizeData = async() => {
    const dataJSONFile = await readJsonFile();    
    const dataNormalize = new Array([]);   
    
    dataJSONFile.map((data,index) => {
        dataNormalize[index] = {
                    description:data.description,
                    type:"PERSONAL",
                    clean:false,
                    income:data.isCharge ? false : true
                };
    });
    const result = { data:dataNormalize }
      fs.writeFile(`./datoClean_${Date.now()}.json`,JSON.stringify(result, null, 2))
      console.log('Se realiza exitosamente el formateo de TRXS');
      console.log('Se Normalizaron:', dataNormalize.length, 'TRXS')
    }

normalizeData();
