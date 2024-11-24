sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a new note and clicks the save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server receives the new note as JSON data
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser stays on the same page and updates the notes list with the new note