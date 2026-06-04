# SportsData - Backend Application for Sports Analysts

Questo è il modulo backend dell'applicazione SportsData, una piattaforma professionale progettata per connettere analisti sportivi (Match Analysts, Data Analysts) con club e recruiter del mondo dello sport. 

Il sistema permette agli analisti di pubblicare e gestire il proprio portfolio di progetti e ai recruiter di inserire annunci di lavoro mirati, integrando strumenti di geolocalizzazione e analisi dei repository.

---

## Funzionalità Principali (Features)

1. Gestione Utenti e Ruoli: Sistema completo di registrazione e login con gestione di 3 ruoli distinti (`ROLE_ANALYST`, `ROLE_CLUB_RECRUITER`, `ROLE_ADMIN`), ognuno con permessi e regole di accesso dedicate.
2. Autenticazione Sicura: Implementazione di sicurezza stateless basata su JWT (JSON Web Token) e crittografia delle password tramite BCrypt.
3. Portfolio Progetti: Gli analisti possono pubblicare i propri progetti di analisi. Il sistema si integra con le API di GitHub per estrarre automaticamente il linguaggio di programmazione principale del repository inserito.
4. Bacheca Annunci di Lavoro: I recruiter possono pubblicare annunci di lavoro. Il sistema si integra con le API di OpenStreetMap (Nominatim) per convertire automaticamente la località inserita in coordinate geografiche reali (Latitudine e Longitudine) utili per la mappa.
5. Modello Dati Avanzato: Architettura del database strutturata su 8 tabelle complessive con una gerarchia di ereditarietà di tipo `JOINED` sulla classe madre dei contenuti.
6. Validazione e Controllo Errori: Validazione rigorosa di tutti i dati in ingresso tramite annotazioni Jakarta Validation e gestione centralizzata degli errori con risposte JSON pulite e strutturate.

---

## Tecnologie Utilizzate

* Java 25
* Spring Boot 4.0.6
* Spring Data JPA (per la persistenza dei dati)
* Spring Security (per la protezione degli endpoint)
* PostgreSQL (Database Relazionale)
* JJWT 0.11.5 (per la gestione dei token JWT)
* Lombok (per l'ottimizzazione del codice boilerplate)
* Maven (per la gestione delle dipendenze e build)

---

## Variabili d'Ambiente Richieste (Environment Variables)

Per far funzionare correttamente l'applicazione, è necessario configurare le seguenti proprietà nel file `src/main/resources/application.properties` o impostarle come variabili d'ambiente nel sistema/IDE:

```text
# Configurazione del Database PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/sportsdata
spring.datasource.username=IL_TUO_UTENTE_POSTGRES
spring.datasource.password=LA_TUA_PASSWORD_POSTGRES

# Configurazione JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Configurazione Sicurezza JWT
jwt.secret=UnaChiaveSegretaMoltoLungaEComplessaDiAlmeno256BitPerGarantireLaSicurezzaDelToken12345
jwt.expiration=86400000