# SportsData - Frontend Application

## Panoramica del Progetto
SportsData è un'applicazione Single Page (SPA) sviluppata in React che funge da punto di incontro tra Data Analyst sportivi e Club professionistici. La piattaforma permette agli analisti di esporre il proprio portfolio (modelli predittivi, repository GitHub, demo live) e ai recruiter di pubblicare annunci di lavoro geolocalizzati.

Il frontend si interfaccia tramite API RESTful a un backend Spring Boot e gestisce l'autenticazione tramite JWT.

## Stack Tecnologico
* **Framework/Libreria:** React 19
* **Build Tool:** Vite 8
* **Routing:** React Router DOM v7
* **State Management:** Redux Toolkit
* **HTTP Client:** Axios (con interceptor per l'iniezione automatica del token di autorizzazione)
* **UI/Styling:** React Bootstrap, Bootstrap 5
* **Mappe:** React Leaflet, Leaflet

## Funzionalità Principali
* **Autenticazione e Autorizzazione:** Gestione login/registrazione basata su ruoli (`ROLE_ANALYST`, `ROLE_CLUB_RECRUITER`, `ROLE_ADMIN`).
* **Gestione Progetti (Portfolio):** Gli utenti con ruolo analista possono creare, visualizzare e rimuovere progetti.
* **Gestione Annunci di Lavoro:** Pubblicazione di offerte di lavoro che includono l'integrazione con Leaflet per il rendering su mappa delle coordinate geografiche dell'azienda.
* **Ricerca e Filtraggio:** Ricerca avanzata degli annunci di lavoro in base alla località.
* **Rotte Protette:** Utilizzo del componente `ProtectedRoute` per limitare l'accesso alla Dashboard unicamente agli utenti provvisti di token JWT valido.

## Architettura dello State Management
Il progetto utilizza Redux Toolkit per centralizzare lo stato dell'applicazione. Lo store è frammentato nei seguenti slice:
* `authSlice`: Gestisce il flusso di autenticazione, la memorizzazione persistente del token JWT su `localStorage` e le informazioni del profilo utente corrente.
* `projectSlice`: Gestisce il fetch, la creazione e la rimozione dei progetti tramite thunk asincroni.
* `jobAdSlice`: Gestisce le operazioni CRUD sugli annunci di lavoro e le funzioni di ricerca filtrata.

## Prerequisiti
* Node.js (versione 18 o superiore consigliata)
* npm come package manager
* Backend Spring Boot in esecuzione sulla porta 8080 (URL di base configurato su `http://localhost:8080/api`)

## Installazione e Avvio Locale
1. Clonare il repository.
2. [cite_start]Spostarsi nella directory del progetto:
   ```bash
   cd front