-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 12 août 2022 à 13:26
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bdnote`
--

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `NumInscription` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Adresse` varchar(50) NOT NULL,
  `DateNaissance` varchar(50) NOT NULL,
  `Sexe` varchar(50) NOT NULL,
  `Annee` varchar(50) NOT NULL,
  PRIMARY KEY (`NumInscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`NumInscription`, `Nom`, `Adresse`, `DateNaissance`, `Sexe`, `Annee`) VALUES
('E001', 'Haja', 'Gaga1', '10 Mai 1997', 'Homme', 'L1'),
('E002', 'Tolotra ', 'Soatsihadino', '18 juin 1998', 'Homme', 'L1'),
('E003', 'Luisa ', 'Ivory', '06 Aôut 2000', 'Femme', 'L1'),
('E004', 'Arlin', 'Sohatsihadino', '15 Mars 1997', 'Homme', 'L1'),
('E005', 'Barry', 'Ivory', '09 juin 1999', 'Femme', 'L1'),
('E006', 'Doda', 'Isaha', '18 Mars 2008', 'Homme', 'L1'),
('E007', 'Francia', 'Rodary', '22 Octobre 2000', 'Homme', 'L1');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE IF NOT EXISTS `matiere` (
  `CodeMatiere` varchar(50) NOT NULL,
  `Designation` varchar(50) NOT NULL,
  `Coef` int(11) NOT NULL,
  PRIMARY KEY (`CodeMatiere`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`CodeMatiere`, `Designation`, `Coef`) VALUES
('M001', 'JAVA', 2),
('M002', 'JQUERY', 2),
('M003', 'JSP', 2);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CodeMatiere` varchar(50) NOT NULL,
  `NumInscription` varchar(50) NOT NULL,
  `Note` int(11) NOT NULL,
  `NotePonderee` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notes_ibfk_1` (`CodeMatiere`),
  KEY `NumInscription` (`NumInscription`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `CodeMatiere`, `NumInscription`, `Note`, `NotePonderee`) VALUES
(21, 'M001', 'E004', 13, 26),
(22, 'M002', 'E004', 11, 22),
(23, 'M003', 'E004', 9, 18),
(26, 'M001', 'E001', 15, 30),
(27, 'M002', 'E001', 7, 14),
(28, 'M003', 'E001', 13, 26),
(29, 'M001', 'E002', 9, 18),
(30, 'M002', 'E002', 8, 16),
(31, 'M003', 'E002', 7, 14);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`CodeMatiere`) REFERENCES `matiere` (`CodeMatiere`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`NumInscription`) REFERENCES `etudiant` (`NumInscription`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
