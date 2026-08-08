# Ausgewählte Engagements (Texte ersetzt am 2026-08-08, Branch technical-positioning)

## Visuals auf Hero-Bildsprache umgestellt (2026-08-08 abends)

Alle vier Mini-Mockups (SQL-Transaktions-Snippet mit Beispiel-Badge, Formular-Flow,
Felder-plus-Zweisprachig-Karten, PR-Checkliste) wurden durch eigenständige Hexagon-Diagramme
in der Bildsprache des Hero-Visuals ersetzt (Ports, weiche Pfeile, rote gestrichelte Verstöße
mit ✗). Das TODO für ein echtes Justiz-SQL-Snippet ist damit hinfällig, es gibt kein
Code-Artefakt mehr. Alte Keys in der Git-Historie (Commit 91ae38d und davor).
Die Body-Texte wurden gleichzeitig geschärft: In jedem Fall steht jetzt ausdrücklich, dass die
Architektur entworfen und die Regeln als Constraints verankert wurden; alte Fassungen in der
Git-Historie.

## Pills (Kategorie-Label und Bestand/Neuentwurf-Badges, am 2026-08-08 abends entfernt)

- Labels de/en: Justiz / Justice system · Veranstaltungsportal / Event platform · Öffentliche Verwaltung / Public administration · Softwareentwicklung / Software development
- Badges de/en: Neuentwurf / New build (Justiz) · Bestand, erweitert / Existing system, extended (Portal) · Greenfield / Greenfield (SDG); Software-Fall war noch unzugeordnet (offenes TODO damit hinfällig)

## Entwurf/Durchsetzung-Paare und Verworfen-Zeilen (am 2026-08-08 abends komplett von den Karten entfernt)

Die Badges (Neuentwurf, Bestand erweitert, Greenfield) blieben. Entfernt wurden pro Fall die
gelabelten Zeilen Entwurf und Durchsetzung sowie die Verworfen-Sätze:

- Justiz, Entwurf: Integrität liegt im Code, nicht in Abläufen oder Erinnerung. / Integrity lives in the code, not in processes or memory.
- Justiz, Durchsetzung: Bedingte Prüfungen in der Transaktion weisen kollidierende Buchungen ab, bevor sie gespeichert sind. / Conditional checks inside the transaction refuse conflicting bookings before they are ever stored.
- Portal, Entwurf: Veranstalter pflegen ihre Einträge selbst, das System validiert. / Organisers maintain their own listings, the system validates.
- Portal, Durchsetzung: Das E-Governance-Formular liefert JSON. Was die Validierung beim Import nicht besteht, lässt sich nicht veröffentlichen. / The e-governance form delivers JSON. Whatever fails validation on import cannot be published.
- Portal, Verworfen: E-Mail-Parsing wurde nicht gebaut: Es gab keine Vorlage, jede Veranstalter-Mail sah anders aus. / Email parsing was not built: there was no template, every organiser email looked different.
- SDG, Entwurf: Vordefinierte Felder statt freiem Layout, Übersetzung als Workflow-Schritt. / Predefined fields instead of free layout, translation as a workflow step.
- SDG, Durchsetzung: Ein Workflow-Status schaltet die Veröffentlichung frei. Ohne englische Übersetzung erreicht ihn keine Seite. / A workflow status gates publication. No page reaches it without an English translation.
- SDG, Verworfen: Ein zusätzliches System wurde nicht gebaut. Das Budget gab keine neuen Tools her, also wanderte die Regel in den bestehenden Workflow. / An additional system was not built. The budget allowed no new tools, so the rule went into the existing workflow.
- Software, Entwurf: Ein modularer Monolith, ein Modulith, mit benannten Modulgrenzen. / A modular monolith, a modulith, with named module boundaries.
- Software, Durchsetzung: ArchUnit-Tests prüfen Schichtregeln und Abhängigkeitsrichtungen. Die CI macht bestandene Tests zur Merge-Bedingung. / ArchUnit tests check layer rules and dependency directions. The CI makes passing them a merge requirement.

## `engagements.1.body` (alter Schluss-Satz)

- de: … Ich habe den Neuaufbau begleitet und Integrität in jede Ebene eingebaut, von Validierungsregeln bis zu Datenbank-Constraints.
- en: … I guided the rebuild and designed integrity into every layer, from validation rules to database constraints.

## Alte Mechanismus-Zeilen

- `engagements.1.mechanism`
  - de: Validierungsregeln und Datenbank-Constraints weisen kollidierende Buchungen von selbst ab.
  - en: Validation rules and database constraints refuse conflicting bookings on their own.
- `engagements.2.mechanism`
  - de: Das Abtippen verschwand in einer Self-Service-Struktur mit automatischem Import.
  - en: The typing disappeared into a self-service structure with an automated import.
- `engagements.3.mechanism`
  - de: Jede Seite entsteht aus vordefinierten Feldern, und ohne englische Übersetzung geht sie nicht live.
  - en: Every page passes predefined fields and a hard publishing gate before it goes live.
- `engagements.4.mechanism`
  - de: Ein Merge setzt jetzt bestandene Architekturtests und CI-Gates voraus.
  - en: A merge now requires passing architecture tests and CI gates.

## Justiz-Kalender-Mockup (`engagements.1.diagram.*`, ersetzt durch Transaktions-Artefakt)

- de: Gerichtssaal 1 · Verhandlung · 2. Verhandlung · Neue Verhandlung · Abgelehnt · Gebucht · Frei
- en: Courtroom 1 · Hearing · Second hearing · New hearing · Refused · Booked · Free
- Alte aria de: Diagramm: ein Gerichtssaal-Kalender, in dem eine zweite Verhandlung in einem belegten Zeitfenster abgelehnt und eine Verhandlung in einem freien Zeitfenster gebucht wird
- Alte aria en: Diagram: a courtroom calendar where a second hearing in an occupied slot is refused and a hearing in a free slot is booked
