const express = require('express');
const router = express.Router();

const myArticles = require('../config/tempDpListOfPages')

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    myArticles.tempArrayOfArticles = myArticles.tempArrayOfArticles.filter( item => item.id !== id)
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    let index = -1;

    myArticles.tempArrayOfArticles.find( (item, i) => {
        if(item.id == id){
            index = i;
            return true;
        }
    })

    if(index != -1){
        myArticles.tempArrayOfArticles[index].status = status;
        res.json({success: true});
        return;
    }
    res.json({success:false});
})

module.exports = router;