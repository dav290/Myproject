const express=require('express')
const app=express()
const multer = require('multer');
app.listen(3000,()=> console.log("App listening on port 3000"))

const path=require('path')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
const upload = multer({ dest: 'uploads/' });


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
        
          
          res.status(200).json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
          });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
  
});
