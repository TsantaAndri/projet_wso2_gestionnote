const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.use(require('../notification/flash'));

//classement d'un niveau
router.post('/classement', (req, res) => {


    if(req.body.annee.length < 1){
        req.flash('error', "Veuillez sélectionner un niveau !")
        res.redirect('/classement_etudiant');
    }else{
        const niveau = req.body.annee;

        let sql = "SELECT etudiant.NumInscription, Nom, Annee, SUM(notes.Note*matiere.Coef)/SUM(matiere.Coef) AS moyenne "
                            + "FROM etudiant, matiere, notes "
                            + "WHERE etudiant.NumInscription=notes.NumInscription AND matiere.CodeMatiere=notes.CodeMatiere AND etudiant.Annee='" + niveau + "'"
                            + "GROUP BY etudiant.NumInscription ORDER BY moyenne DESC";

        connection.query(sql, (err, rows) => {
            if(err) throw err

            if(rows.length < 1){
                req.flash('error', "Le niveau '"+niveau+"' n'avait aucun note !")
                res.redirect('/classement_etudiant');
                
            }else{
                let sql1 = " SELECT SUM(notes.Note*matiere.Coef)/SUM(matiere.Coef) AS moyClass "
                + "FROM ((etudiant INNER JOIN notes ON etudiant.NumInscription=notes.NumInscription)INNER JOIN "
                + "matiere ON matiere.CodeMatiere=notes.CodeMatiere)WHERE etudiant.Annee ='" + niveau + "'";

                connection.query(sql1, (error, resultat) => {
                    if(error) throw error
                    res.render('affichage_classement',{
                        classement : rows,
                        info : rows[0],
                        moyenClass : resultat[0]
                    });
                });
            }   
        });
    }
    
});

module.exports = router;