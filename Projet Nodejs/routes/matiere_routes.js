const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.use(require('../notification/flash'))

//boutton lien vers la page d'ajout matiere (page ajout_matiere)
router.get('/ajout_matiere',(req, res) => {
    res.render('ajout_matiere');
});

//select dans database (page index)
router.get('/listes_matiere',(req, res) => {
    let sql = "SELECT * from matiere";
    connection.query(sql, (err, rows) =>{ 
        if(err) throw err;
        res.render('listes_matiere', {
            matiere : rows
        });
    });
});

//ajouter une matiere dans database
router.post('/save', (req, res) => {
    let sql2 = "select * from matiere where CodeMatiere = '"+req.body.cd+"'";
    connection.query(sql2, (err2, rows) => {
        if(err2) throw err2
        
        if(rows.length > 0){
            req.flash('error', "Le code matière '"+req.body.cd+"' existe déjà !")
            res.redirect('/ajout_matiere')
        }else{
            let dataM = {CodeMatiere: req.body.cd, Designation: req.body.design, Coef: req.body.coef};
            let sql = "INSERT INTO matiere SET ?";

            connection.query(sql, dataM,(err, resultat) => {
                if(err) throw err;
                res.redirect('/listes_matiere'); 
            });
        }
    });

});

//Modifier une matiere
router.get('/modifier_matiere/cd=(:CodeMatiere)',(req, res) => {
    const cdMatiere = req.params.CodeMatiere;
    let sql = "select * from matiere where CodeMatiere ='"+cdMatiere+"' ";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('modifier_matiere', {
            matiere : result[0]
        });
    }); 
});

router.post('/update', (req, res) => {
    const cdMatiere = req.body.cd;
    let sql = "UPDATE matiere SET CodeMatiere ='"+req.body.cd+"', Designation ='"+req.body.design+"', Coef ='"+req.body.coef+"' WHERE CodeMatiere ='"+cdMatiere+"' ";
    connection.query(sql, (err, resultat) => {
        if(err) throw err;
        res.redirect('/listes_matiere');       
    });
});

//Supprimer une matiere
router.get('/supprimer_matiere/cd=(:CodeMatiere)',(req, res) => {
    const cdMatiere = req.params.CodeMatiere;
    let sql = "DELETE from matiere where CodeMatiere ='"+cdMatiere+"' ";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect('/listes_matiere');
    }); 
});

module.exports = router;