//const { query } = require('express');
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.use(require('../notification/flash'))

//select dans database (page index)
router.get('/listes_note',(req, res) => {
    let sql = "SELECT * from notes";
    connection.query(sql, (err, rows) =>{ 
        if(err) throw err;
        res.render('listes_note', {
            note : rows
        });
    });
});

//select le code matiere dans database (page ajout note) et select le num inscription dans database (page ajout note)
router.get('/ajout_note', function (req, res, next) {
    let sql1 = "select CodeMatiere from matiere ";
    let sql2 = "select NumInscription from etudiant ";
    connection.query(sql1, function (err, rows) {
        if(err) throw err;
        connection.query(sql2, function(error, resultat ){
            if(error) throw error
            res.render('ajout_note', {
                codeM : rows,
                numIn : resultat
            });
        });
    }); 

});

// Enregistrer note (page ajout note)
router.post('/saveNote', (req, res) => {

    let sql2 = "select * from notes where CodeMatiere = '"+req.body.codeM+"' AND NumInscription = '"+req.body.numInscr+"' ";
    connection.query(sql2, (err2, rows) => {
        if(err2) throw err2
        
        if(rows.length > 0){
            req.flash('error', "La note de l'étudiant '"+req.body.numInscr+"' existe déjà !")
            res.redirect('/ajout_note')
        }else{
            const cd = req.body.codeM;
            const numInscr = req.body.numInscr;
            const note1 = req.body.note;
    
            let sql = "SELECT SUM(Coef* '"+note1+"')As test From matiere WHERE CodeMatiere ='" + cd + "'";
            connection.query(sql, (err, rows) => {
                if(err) throw err;
                var notePond = rows[0].test; //Coef x Note1

                let data = {CodeMatiere: cd, NumInscription: numInscr, Note: note1, NotePonderee: notePond};
                let sql3 = "INSERT INTO notes SET ?";
                connection.query(sql3, data,(err, resultat) => {
                    if(err) throw err;
                    res.redirect('/listes_note');
                });
            });
        }
    });
     
});  

//modifier note (page modifier note)
router.get('/modifier_note/idnote=(:id)',(req, res) => {
    const idnote = req.params.id;
    let sql = "select * from notes where id ='"+idnote+"' ";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('modifier_note', {
            noteModifier : result[0]
        });
    }); 
});

router.post('/updatenote', (req, res) => {
    const cd = req.body.cd; 
    const numInscr = req.body.numInscr;
    const noteM = req.body.noteM;
    let requete = "select SUM(Coef * '"+noteM+"') As resNote from matiere where CodeMatiere ='"+cd+"' ";
    connection.query(requete, (err, rows) => {
        if(err) throw err;
        var noteFinale = rows[0].resNote;
        const id = req.body.id;
        let sqlU = "UPDATE notes SET CodeMatiere ='"+cd+"', NumInscription ='"+numInscr+"', Note ='"+noteM+"',  NotePonderee ='"+noteFinale+"' WHERE id ='"+id+"' ";
            connection.query(sqlU, (err, resultat) => {
            if(err) throw err;
            res.redirect('/listes_note');       
        });
    });
});

//Supprimer une note
router.get('/supprimer_note/idnote=(:id)',(req, res) => {
    const id = req.params.id;
    let sql = "DELETE from notes where id ='"+id+"' ";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect('/listes_note');
    }); 
});


module.exports = router;