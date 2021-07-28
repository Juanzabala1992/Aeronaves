const { Router } = require ('express');
const router = Router();
const travel = require('../models/travel')
const user= require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/signup', async(req, res)=> {
    
    const { email, password }= req.body;
    const newuser = new user ({email,password})
    await newuser.save();
    const token =jwt.sign({_id: newuser._id }, 'secretkey');
    res.status(200).json({token});
})
   router.post('/signin', async (req, res)=>{

    const { email, password } = req.body;    
    const users = await user.findOne({email})
    if(!users) return res.status(401).send("The email doesn't exist");
    
    if(users.password !== password) return res.status(401).send("Wrong password"); 

    const token = jwt.sign({_id: user._id},'secretkey');
    return res.status(200).json({token}) 
}); 
router .get('/private-tasks', async (req,res)=>{
    const distravel = await travel.find(); 
    res.json(distravel);   
    console.log(distravel);

});
router .post('/private-tasks', verifyToken, async (req,res)=>{
    const { ubicacion, llegada, salida, pasajeros } = req.body;    
    const newtravel = new travel({ubicacion, llegada, salida, pasajeros})
    await newtravel.save();
    console.log(newtravel);
    const token = jwt.sign({_id: newtravel._id},'secretkey');
    return res.status(200).json({token}) 

});

router.delete('/:id', async(req,res)=>{
    const id =req.params.id;
    console.log(id)
    try{
        const deltetravel= await travel.findOneAndDelete({_id: id})
        console.log("Esto es el id", id)
        if (deltetravel){
            res.json( {
                mensaje:"Eliminado"
            }
            )
        }else{
            res.json( {
                mensaje:"No se pudo eliminar"
            }
            )
                     
        }
    }catch(error){
        console.log(error)
    }
    
});

function  verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Acceso denegado')
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token==="null"){
        return res.status(401).send('Acceso denegado');
    }
    const payload = jwt.verify(token, 'secretkey')
    console.log(payload)
    req.userId = payload._id;
    next(); 
}
module.exports = router;