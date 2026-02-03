Situation:

The user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: status code 201 CREATED
    activate server
    Note left of server: The server adds the note to data.json
    server-->>browser: {"message":"note created"}
    deactivate server
    Note right of browser: The browser adds the note to its local array and redraws the notes without fetching anything else
```
