# WIP Filterable gaming news react component

A single widget component to show gaming news from different websites with filter option.
This is part of a bigger project.

## Getting Started

Di seguito le istruzioni per installare le dipende dell'app React, del backend su Strapi, avviare i due server ed il file accessorio per lo scraping delle news gaming.

### Prerequisiti

1. Eseguire il seguente comando nella root e successivamente nella cartella backend:

  ```sh
  npm i
  ```
2. Avviare con il live server di VScode il file "newsFetch.js" in /src.

3. Avviare il server dalla cartella "backend" con il seguente comando:
```sh
  npm run develop
  ```
4. Accedere al pannello di Strapi dopo aver registrato un account da <a href="http://localhost:1337/admin/settings/users-permissions/roles/2">http://localhost:1337/admin/settings/users-permissions/roles/2</a> ed impostare come attivi i permessi per "Segnalibro" nella sezione "Permissions"

5. Avviare l'app react dalla root con il seguente comando:
```sh
  npm start
  ```