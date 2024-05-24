const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

const etudiantRouter = require('./routes/etudiant_routes');
const matiereRouter = require('./routes/matiere_routes');
const noteRouter = require('./routes/note_routes');
const bulletinRouter = require('./routes/bulletin_routes');
const classementRouter = require('./routes/classement_routes');

// Configuration CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Access-Control-Allow-Origin', 'Content-Type', 'SOAPAction', 'ApiKey', 'Internal-Key']
};
app.use(cors(corsOptions));

// Configurer l'authentification OAuth2 (exemple simplifié)
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }
    // Logique pour valider le token OAuth2
    next();
});

// Configurations de vue
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware pour parser les corps de requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Ressources statiques
app.use('/assets', express.static("public"));

// Configuration des sessions
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'haja',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}));

// Middleware pour notifications flash (commenté si non utilisé)
// app.use(require('./notification/flash'));

// Définir les routes
app.use('/etudiant', etudiantRouter);
app.use('/matiere', matiereRouter);
app.use('/note', noteRouter);
app.use('/bulletin', bulletinRouter);
app.use('/classement', classementRouter);

// Lien vers le menu principal
app.get('/menu_principal', (req, res) => {
    res.render('menu_principal');
});

// Lien vers la page d'ajout de note
app.get('/ajout_note', (req, res) => {
    res.render('ajout_note');
});

// Lien vers le bulletin de notes
app.get('/bulletin_de_note', (req, res) => {
    res.render('bulletin_de_note');
});

// Lien vers l'affichage du bulletin
app.get('/affichage_bulletin', (req, res) => {
    res.render('affichage_bulletin');
});

// Lien vers le classement des étudiants
app.get('/classement_etudiant', (req, res) => {
    res.render('classement_etudiant');
});

// Lien vers l'affichage du classement
app.get('/affichage_classement', (req, res) => {
    res.render('affichage_classement');
});

// Lien vers les statistiques des étudiants
app.get('/statistique_etudiant', (req, res) => {
    res.render('statistique_etudiant');
});

// Lien vers le modal semantic
app.get('/semantic_modal', (req, res) => {
    res.render('semantic_modal');
});

// Démarrer le serveur
app.listen(8080, () => {
    console.log('Serveur bien démarré sur le port 8080!');
});
