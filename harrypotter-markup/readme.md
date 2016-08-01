# Harry Potter

## To fix glossary topbar hidden under menu, add this css:

    .main.glossary .header.floating {
        position: fixed;
        top: -269px;
    }
    .main.glossary .listing .books {
        max-height: calc(100vh - 113px - 35px);
    }
    .main.glossary .glossary-sections>.section .section-headline span {
        margin-top: 50px;
    }

