import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
/**
 * Transformación de datos a categorizador, tomando como origen scrapper
 */
const __dirname = fileURLToPath(new URL('.',import.meta.url));
const ruta = path.join(__dirname,'./origen.json');

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
                    id_transaction:data.id,
                    description:data.description,
                    type:0,
                    
                };
    });
    const result = { data:dataNormalize }
      fs.writeFile(`./datoCat_${Date.now()}.json`,JSON.stringify(result, null, 2))
      console.log('Se realiza exitosamente el formateo de TRXS');
      console.log('Se Normalizaron:', dataNormalize.length, 'TRXS')
    }

normalizeData();