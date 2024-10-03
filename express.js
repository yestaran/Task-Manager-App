const express = require('express');
const app = express();
let newArray = []
app.use(express.json());
let i = 1;

app.post('/tasks', (req, res) => {

    if (req.body.title && req.body.discription) {
        res.status(201);
        let obj = {
            "id": i,
            "title": req.body.title,
            "discription": req.body.discription,
            "status": 'Pending'
        }
        i++;
        newArray.push(obj)

        res.send(obj);
    }
    else {
        res.status(400);
        res.send('bad response');

    }
}
)
app.get('/tasks', (req, res) => {
    res.send(newArray);
}
)


app.get('/tasks/:id', (req, res) => {
    let is_found = 0;
    let value = [];
    for (let val of newArray) {
        if (val.id == req.params.id) {
            value = val
            is_found = 1;
        }
    }

    if (is_found == 1) {
        res.status(200).send(value)

    } else {

        res.status(404);
    }
});

app.put('/tasks/:id', (req,res) => {
    let index = 0;
    for (let val of newArray) {
        if (val.id == req.params.id) {
            if(req.body.title){
                val.title=req.body.title
            }
            if(req.body.discription){
                 val.discription = req.body.discription  }
            if(req.body.status){
                val.status = req.body.status
            }
            newArray[index]= val;
            res.status(200).send(val)
        }
        index++
    }
    res.send(404)

})
     
app.delete('/tasks/:id', (req, res) => {

    let index = 0;
    for (let val of newArray) {
        if (val.id == req.params.id) {
            newArray.splice(index, 1)
            res.status(200).send('task deleted succesfully')
        }
        index++
    }
    res.status(404)
})

app.patch('/tasks/:id/complete', (req, res) => {
    for (let val of newArray) {
        if (val.id == req.params.id) {
            val.status = 'completed'
            res.status(200).send(val)
        } else{
            res.status(404)
        }
    }


})



app.listen(5002, () => {
    console.log('running successfully')
});
