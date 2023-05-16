const path = require('path');
const express = require('express');
const multer = require('multer');

const Ajv = require('ajv');
const ajv = new Ajv();

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads/');
//console.log(uploadDir)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
    
  })
  console.log(storage)
  const upload = multer({ storage: storage })



const schema = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            minLength: 1,
            maxLength: 255
        },
        surname: {
            type: 'string',
            minLength: 1,
            maxLength: 10
        }
    }
};


router.get('/profile', (req,res) => {
    res.render("profile");
});

router.post('/new_profile', upload.single('photo'), (req, res) => {
    console.log(req.body);
    const dataProfile = req.body;
    const photoProfile = req.file;

    console.log(dataProfile, photoProfile)
   
    const validate = ajv.compile(schema);
    const valid = validate(dataProfile);

    if (!valid){
        res.json({status: "valid_data error", errors: validate.errors})
    }
    console.log('valid:', valid);
    console.log('errors:', validate.errors);
    res.json({status:"ok"});
});



module.exports = router;