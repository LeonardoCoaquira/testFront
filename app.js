const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { imageData: null }); // Pasa imageData como nulo inicialmente
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).render('index', { error: 'No se ha seleccionado ningún archivo', imageData: null });
  }

  try {
    // Procesar el archivo CSV y generar la imagen
    const csvData = fs.readFileSync(file.path, 'utf8');
    const data = processCSVData(csvData);
    const image = generateImage(data);

    // Eliminar el archivo CSV temporal
    fs.unlinkSync(file.path);

    // Renderizar la vista con la imagen
    
    res.render('index', { imageData: image });
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Error al procesar el archivo CSV', imageData: null });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

function processCSVData(csvData) {
  // Procesar los datos CSV y obtener los datos necesarios para generar la imagen
  const data = [];
  const lines = csvData.split('\n');
  for (const line of lines) {
    const values = line.split(',');
    // Extraer los datos relevantes de cada línea
    data.push({
      // Obtener los valores necesarios para generar la imagen
    });
  }
  return data;
}

function generateImage(data) {
  // Crear un lienzo y dibujar la imagen
  // Uso de node-canvas en lugar de document.createElement('canvas')
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext('2d');

  // Dibujar los elementos de la imagen
  for (const item of data) {
    // Dibujar el elemento en el lienzo
  }

  // Convertir el lienzo a una imagen PNG
  const imageData = canvas.toDataURL('image/png');
  return imageData;
}
