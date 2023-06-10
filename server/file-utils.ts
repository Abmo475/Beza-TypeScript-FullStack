import csvToJson from 'csvtojson';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

const tempFolderPath = path.join(__dirname, '../', 'temp');

const readFromFile = async (filePath: string) => {
  return new Promise((resolve) => {
    csvToJson()
      .fromFile(filePath)
      .then((jsonObj) => {
        return resolve(jsonObj);
      });
  });
};

const writeToTempFile = async (
  originalExcelFile: string,
  tempCsvFilePath: string,
): Promise<void> => {
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath);
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(originalExcelFile);

  const writeStream = fs.createWriteStream(tempCsvFilePath);
  await workbook.csv.write(writeStream, { sheetName: 'books' });
};

export { tempFolderPath, readFromFile, writeToTempFile };
