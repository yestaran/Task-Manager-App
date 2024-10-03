module.exports = reqFilter = (req,res,next)=>{
    if(!req.query.age) {

        res.send('enter age')   
    } 
    else if(req.query.age<18)
        {
        res.send('you are not 18+')
    }
    else{
    next();
    }
}
