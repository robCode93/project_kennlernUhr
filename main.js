"use strict"

document.addEventListener("DOMContentLoaded", () => {

    /**
     *  dataStore = Angabe der aktuellen Zeile der Tabelle im <main>
     *  datePicker = speichert das HTML-Element <input type="date"> ab
     *  dateText = speichert das HTML-Element <div> für die Ausgabe des Ergebnisses ab 
     */
    let dataStore = 0;
    const datePicker = document.getElementById("datePicker");
    const dateText = document.querySelectorAll(".dateText")[0];

    /**
     * Funktion um die errechneten Differenzen in die Tabelle einzutragen
     * 
     * @param {Date} dateData = Das vom Nutzer eingegebene Datum
     * @param {Date.getfullYear()} yearData = Jahre bis/seit heute
     * @param {Date.getmonth()} monthData = Monatre bis/seit heute
     * @param {Date.getDate()} dayData = Tage bis/seit heute
     */
    function writeDataInTable(dateData, yearData, monthData, dayData) {
        if(dataStore > 2){
            // Vorgefertigte 3 Zeilen der Tabelle auf der Webseite füllen
            const tableLine = document.querySelectorAll(".tableLines")[dataStore];
            const tableCells = tableLine.children;

            // Daten in die Zeilen füllen (Laufende Nummer, Datum, Jahre, Monate, Tage, ...)
            tableCells[0].innerText = dataStore+1;
            tableCells[1].innerText = dateData;
            tableCells[2].innerText = yearData;
            tableCells[3].innerText = monthData;
            tableCells[4].innerText = dayData;

            // Zeilennummer der Tabelle um 1 erhöhen -> nächste Zeile vorbereiten 
            dataStore++;
        }else{

            // Mehr als 3 Daten einspeichern.... ab 3 ->
            const tableBody = document.querySelector(".tableBody");

            // Listenplatz erschaffen --> Zeile mit Spalten
            const newTableLine = document.createElement("tr");
            newTableLine.classList.add("tableLines");
            
            for(let i = 0; i < 5; i++){
                if(i === 0){
                    newTableLine.appendChild(document.createElement("th"));
                }
                newTableLine.appendChild(document.createElement("td"));
            }

            // Attribute scope="" auf das <th> Element setzen
            newTableLine.children[0].setAttribute("scope", dataStore);
            
            // Einfügen des Konstrukts in die Table
            tableBody.appendChild(newTableLine);

            // Einsetzen der Daten in die Tabelle
            const tableLine = document.querySelectorAll(".tableLines")[dataStore];
            const tableCells = tableLine.children;

            tableCells[0].innerText = dataStore+1;
            tableCells[1].innerText = dateData;
            tableCells[2].innerText = yearData;
            tableCells[3].innerText = monthData;
            tableCells[4].innerText = dayData;

            // Variable für die Zeilenzählung um 1 erhöhen 
            dataStore++;
        }
            
    }



    if(datePicker instanceof HTMLElement){
        /**
         * Event "change" wird immer dann ausgeführt, wenn sich das Datum in dem <input> ändert
         */
        datePicker.addEventListener("change", () => {

            // Heutiges Datum als Referenz anfügen
            const todayDate = new Date();

            // Nutzerdatum vom <input> gecrappt
            const dateOfBeginning = new Date(datePicker.value);

            // Differenz von Start- zu Enddatum in Millisekunden + Vorbereitung Variablen
            let differance = todayDate.getTime() - dateOfBeginning.getTime();
            let years = 0;
            let months = 0;
            let days = 0;

            // Millisekunden in Jahre, Monate und Tage rechnen 
            while(differance > 86400000){
                while(differance > 31536000000){
                    differance -= 31536000000;
                    years++;
                }
                while(differance > 2628000000){
                    differance -= 2628000000;
                    months++;
                }
                while(differance > 86400000){
                    differance -= 86400000;
                    days++;
                }
            }
            
            // String für die Ausgabe der Differenz vorbereiten
            let outputString = "";

            // if-Statements für vorangegange Nullen
            if(years > 0){
                outputString += years;
                if(years > 1){
                    outputString += " Jahre";
                }else{
                    outputString += " Jahr";
                }
                outputString += " ";
            }
            if(months > 0){
                outputString += months;
                if(months > 1){
                    outputString += " Monate";
                }else{
                    outputString += " Monat";
                }
                outputString += " ";
            }
            if(days > 0){
                outputString += days;
                if(days > 1){
                    outputString += " Tage";
                }else{
                    outputString += " Tag";
                }
            }

            // String in Output <div> schreiben + Daten in Tabelle schreiben
            dateText.innerText = outputString;
            writeDataInTable(dateOfBeginning, years, months, days);

            
        })
    }

})