const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.use(require('../notification/flash'))

//select  le num inscription dans database (page ajout note)
router.get('/bulletin_de_note',(req, res) => {
    let sql = "SELECT NumInscription from etudiant";
    connection.query(sql, (err, rows) =>{ 
        if(err) throw err;
        res.render('bulletin_de_note', {
            numIn : rows
        });
    });
});

//bulletin d'un etudiant
router.post('/bulletin', (req, res) => {

    if(req.body.numInscr.length < 1){
        req.flash('error', "Veuillez sélectionner un numéro d'inscription !")
        res.redirect('/bulletin_de_note');
    }
    else{
        let sql2 = "select * from notes where NumInscription = '"+req.body.numInscr+"' ";
        connection.query(sql2, (err2, rows1) => {
            if(err2) throw err2
            
            if(rows1.length < 1){
                req.flash('error', "La note de l'étudiant numéro '"+req.body.numInscr+"' est introuvable !")
                res.redirect('/bulletin_de_note')
            }
            else{
                const numInscr = req.body.numInscr;
                let sql = "SELECT (SUM(notes.NotePonderee) / SUM(matiere.Coef))As Moyenne FROM ((etudiant "
                + "INNER JOIN notes ON etudiant.NumInscription=notes.NumInscription)"
                + "INNER JOIN matiere ON matiere.CodeMatiere=notes.CodeMatiere)WHERE etudiant.NumInscription='" + numInscr + "'";

                connection.query(sql, (err, rows) => {
                    if(err) throw err
                        let sql1 = "SELECT etudiant.NumInscription,etudiant.Nom,etudiant.Annee,matiere.Designation,matiere.Coef,notes.Note,"
                            + "notes.NotePonderee FROM ((etudiant INNER JOIN notes ON etudiant.NumInscription=notes.NumInscription)"
                            + "INNER JOIN matiere ON matiere.CodeMatiere=notes.CodeMatiere)WHERE etudiant.NumInscription='" + numInscr + "'";

                        connection.query(sql1, (error, resultat) => {
                            if(error) throw error
                            res.render('affichage_bulletin',{  
                                valeur : rows,    
                                info : resultat[0], 
                                table: resultat
                            });
                        });    
                });
            }
        });
    }
});


module.exports = router;