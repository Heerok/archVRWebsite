
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Appointments;
		CREATE TABLE Appointments (
						ID int(11) NOT NULL AUTO_INCREMENT,
						Name varchar(255) NOT NULL,
						Address varchar(255) NOT NULL,
						Email varchar(255) NOT NULL,
						AppDate date NOT NULL,
						PRIMARY KEY (ID)
						);
		
DROP TABLE IF EXISTS Creds;
		CREATE TABLE Creds (
						username varchar(255) NOT NULL,
						password varchar(255) NOT NULL,
						rights int(11) NOT NULL,
						);



