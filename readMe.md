
# Kenneth Pillet
Dans ce repo je manipule des api via nodeJS

## Ouvrez le terminal allez dans l'un des dossier via les commands cd
  
### Commande de web-academy-node-td-1: 
(api: https://the-one-api.dev/)

node **<le_nom_du_fichier>**

> Pour **1-book-list.js**
>   - il affichera dans le terminale une liste des 3 livres de l'api

> Pour **2-books-chapters.js** 
>   - il affichera  il affichera dans le terminale

>Pour **3-detailed-args.js characters ou books ou movies**
>(pour les 2 derniers arguments il affichera une liste correspondantes)
>Pour characters:
>   - il faut  ajouter un critère de filtre (name, race et/ou realm)
>   -   il affichera une liste des personnages correspondants

> Pour **final-exercice.js** 
>   - il affichera les citations filtrer grâce aux arguments (tout les arguments ne sont pas obligatoires mais plus la recherches est précise plus facilement vous trouverez la citation) il prend aussi les erreurs, donc bien lire meme quand on écrit mal les arguments) 
> 	-	Exemple:  **node final-exercice.js movie=second character="Frodo Baggins" Mordor**
>   -	Exemple: **node final-exercice.js Gamgee movie=first**
>	-	Exemple: **node final-exercice.js character=Gollum precious** 
>       (pour ce dernier il throw une erreur disant qu'il faut être plus précis)

### Commande de web-academy-node-td-2:
(api: https://comicvine.gamespot.com/api/)

node dist/app.js

***Ouvrez FireFox***

Puis dans votre url au port 3000 :
>Ecrivez l'endpoint **/character/4005-1455** (la fin est l'id IronMan)
> - Il renverra un model de Character formater grâce des queryString

>Ecrivez l'endpoint **/characters?filter=name:*<le_nom_du_personnage>***
> - Il renverra une liste de Character formater grâce des queryString