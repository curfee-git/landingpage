# Lange Fassung der Leistungsbeschreibung (Seite /architecture/ am 2026-08-08 gebaut und am selben Tag wieder entfernt)

Philipps Vorgabe: Es gibt nur eine Landingpage, keine Unterseiten außer Impressum und Datenschutz.
Die Seite lebte kurz als `/architecture/` und `/de/architecture/` (Git-Historie, Commits ac9566e
bis bc50cd3). Hero-Zeile und Scope-Absatz aus demselben Interview bleiben auf der Startseite.
Die deutsche Fassung hier zum Wiederverwenden, die englische in der Git-Historie von `en.json`
(Keys `arch.*`).

## Was ich entwerfe

Ich entwerfe Backend-Architektur für Java und das Spring-Ökosystem. Kein Frontend, keine allgemeine IT-Beratung. Fünf Entscheidungen machen die Arbeit aus, und jede davon habe ich in echten Systemen getroffen.

**Modulschnitt.** Modulith oder getrennte Dienste? Ich habe mich in einem gewachsenen System für den Modulith mit benannten Modulgrenzen entschieden, aus zwei Gründen: Der Betrieb bleibt einfach, und Grenzen müssen sich erst beweisen. Trennen lässt sich später, entlang von Grenzen, die gehalten haben. ArchUnit-Tests halten sie, die CI macht sie zur Merge-Bedingung.

**Domänenmodell.** Wo eine Invariante lebt, entscheidet, ob sie gilt. In einem Buchungssystem für Gerichte wurde die Buchung zum Aggregat, „keine überlappende Buchung" zur Invariante im Code. Einen Gerichtssaal doppelt zu buchen wurde unmöglich.

**Transaktionen.** Integrität liegt im Code, nicht in Abläufen oder Erinnerung. Bedingte Prüfungen in der Transaktion weisen kollidierende Buchungen ab, bevor sie gespeichert sind.

**Integration.** Wie kommen fremde Daten ins System? Ein Veranstaltungsportal bekam ein Self-Service-Formular, das JSON liefert, mit Validierung beim Import. Was die Validierung nicht besteht, lässt sich nicht veröffentlichen. E-Mail-Parsing wurde verworfen: Ohne Vorlage sah jede Mail anders aus.

**Teststrategie.** Architekturtests sind eine eigene Prüfebene neben Build und Tests. Ein PR, der eine Modulgrenze verletzt, kann nicht gemergt werden.

## Bestand und Neuentwurf

Im Bestand beginne ich beim vorhandenen Code und seinen Abhängigkeiten, erst dann wird geschnitten. Das Ergebnis ist ein Zielbild und der Weg dahin in Schritten. Beim Neuentwurf beginne ich bei der Domäne, die Grenzen gelten ab Tag eins. Geholt werde ich, wenn jede Änderung Nebenwirkungen irgendwo anders haben kann, wenn sich mehrere Teams in einem System auf die Füße treten, oder wenn ein Vorfall gezeigt hat, dass die Struktur das Problem ist.

## Wogegen ich arbeite

Drei Irrtümer begegnen mir immer wieder. Microservices lösen das: Wer kein Grenzenproblem gelöst hat, verteilt es nur übers Netzwerk. Ein Tool löst das: Ein Strukturproblem übersteht jeden Tool-Wechsel. Das Wiki regelt das: Eine dokumentierte Konvention ist keine umgesetzte.

Und nicht jede Regel gehört erzwungen. Eine Doku-Pflicht auf jeder Klasse erzeugt Rauschen statt Verständnis; ob eine Erklärung nötig ist, bleibt Urteil.

## Was ein Engagement voraussetzt

Eine CI, die existiert oder entstehen darf. Jemanden mit dem Mandat, Architekturentscheidungen zu treffen. Die Bereitschaft, dass ein roter Build blockiert, auch kurz vor dem Release. Und die Zeit deiner Entwickler, denn eingebaut wird in ihrer Arbeitszeit, nicht nebenher. Nach oben gibt es keine Größengrenze, nur einen Zuschnitt: ein Bereich, nie das ganze Unternehmen.

## Für wen ich nicht der Richtige bin

Für alle, die eine Bestätigung ihrer Architektur suchen. Für alle, die analysieren lassen, aber nichts ändern dürfen. Und für alle, die einen Umsetzer suchen: Feature-Code schreibe ich keinen. Der einzige Code, der von mir in deinem Repo bleibt, sind die Architekturtests, die die entworfenen Grenzen halten.

Wer nicht auf Spring ist, bekommt Entwurf und Beratung, denn wie ein System geschnitten wird, hängt nicht an Spring. Code entwickle ich außerhalb von Java und Spring nicht.
