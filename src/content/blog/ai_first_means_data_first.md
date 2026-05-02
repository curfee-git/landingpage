---
title: "AI-First heißt Data-First: Warum Architektur für KI zu Daten wird"
excerpt: "AI-First wird meist über Werkzeuge beschrieben: Copilot-Lizenzen, Claude-Code-Rollouts, Agenten, die Pull Requests öffnen. Ob KI-Beiträge in einer echten Codebasis funktionieren, hängt aber an einer anderen Frage: Wird die Architektur selbst wie Daten behandelt?"
createdAt: 2026-04-20
topic: "Architektur"
tags:
  - KI
  - Architektur
  - Context Engineering
  - Fitness Functions
  - Standards
---

AI-First bedeutet Data-First. Der Satz taucht auf Konferenzfolien auf, in Strategiepapieren, in Pitch-Decks. Falsch verstanden wird er trotzdem regelmäßig.

Die meisten beschreiben AI-First über die Werkzeuge: Copilot-Lizenzen, Claude-Code-Rollouts, ein interner Agent, der Pull Requests öffnet. Das ist ein Teil der Antwort. Der andere, der entscheidet, ob KI-Beiträge in einer Codebasis jenseits eines Wochenend-Projekts überhaupt etwas Brauchbares produzieren, ist die Frage, ob die Architektur selbst wie Daten behandelt wird.

## Das Context-Window hat kein Gedächtnis

Ein KI-Agent ist kein Junior. Ein Junior lernt im Alltag. Nach sechs Wochen muss er nicht mehr fragen, wo das User-Repository liegt, er hat die Naming-Conventions verinnerlicht und entwickelt ein Gespür dafür, in welches Verzeichnis ein neuer Service gehört. Ein Agent kann das alles nicht.

KI-Agenten lernen deine Codebasis nicht. Zwischen den Aufgaben gibt es kein persistentes Gedächtnis; jeder Aufruf startet bei null und nimmt nur das mit, was du ihm im Context mitgibst. Anthropic beschreibt das in seinem Beitrag zu [effektivem Context-Engineering für KI-Agenten](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): Context ist eine begrenzte Ressource, die man kuratieren muss, statt sie zuzustopfen.

Im Marketing-Material wirkt das Context-Window groß. In der Praxis schrumpft es schnell. Tool-Schemata, Abhängigkeiten, vorherige Ergebnisse, die aktuelle Datei, der Prompt selbst: Das Budget ist aufgebraucht, bevor irgendjemand realisiert, wie schmal es war. Forschung zu Long-Context-Reasoning zeigt dasselbe Muster wieder und wieder. Die effektive Performance bricht lange vor dem nominalen Limit ein. Modelle fokussieren sich auf den Anfang und das Ende des Fensters und übersehen, was in der Mitte steht: der ["Lost in the Middle"](https://arxiv.org/abs/2307.03172)-Effekt.

Für Teams, die ihre Codebasis über zehn Jahre und durch dezentrale Entscheidungen wachsen ließen, ist die praktische Folge unangenehm. Ein Agent kann die ganze Codebasis nicht im Context-Window halten. Es passt immer nur ein Ausschnitt rein. Die Frage ist, ob dieser Ausschnitt repräsentativ für den Rest ist.

Sieht jedes Modul anders aus, sagt ein Modul dem Agenten nichts über das nächste. Die Anzahl Tokens, die für die Orientierung in einer einzigen Aufgabe nötig sind, schießt nach oben. Die Qualität der Schlüsse fällt mit jedem zusätzlichen Context.

Folgt jedes Modul demselben Muster, ist ein Modul das System im Kleinen. Ein Muster, das einmal verstanden ist, gilt für das nächste. Ein Beispiel reicht.

## Struktur ist deine beste Datenquelle

Wenn ich mich in bestehenden Code einarbeite, stoße ich immer auf dieselbe Lücke. Das Datenbank-Schema ist dokumentiert. Die API-Spezifikationen liegen vor, meistens. Fachbegriffe stehen in einem Glossar, das vor Jahren das letzte Mal aktualisiert wurde. Die Ordnerstruktur, die Modulgrenzen, die Art und Weise, wie ein neues Feature ins System integriert wird: All das existiert als implizites Wissen in den Köpfen der Engineers, die am längsten dabei sind. Für einen Engineer, der sechs Wochen Einarbeitung bekommt, reicht das gerade so. Für einen KI-Agenten, der dienstagnachmittags ins Spiel kommt, reicht es überhaupt nicht.

Ich war einmal in einem Unternehmen, das eine Produkt-Suite mit mehr als zehn Domains baute, jede in einem eigenen Team. Jede Domain hatte ein Core-Repository plus alles, was darauf aufgesetzt wurde, insgesamt mehr als dreißig Repositories über die Suite hinweg. Die Architektur war ein Verbund verteilter Monolithen. Entwickler wechselten ständig zwischen internen und Kundenprojekten und somit alle paar Wochen die Codebasis. Die Inkonsistenz zeigte sich überall. Kommentar-Stile und Architekturentscheidungen unterschieden sich zwischen Dateien im selben Repository. Jede Codebasis hatte ihre eigene Pipeline. Eine lokale Umgebung zu starten brauchte ein Dutzend Docker-Container. Die Suite sollte zusammenpassen, aber Integration wurde bei jedem Rollout pro Kunde neu gebaut.

Eine standardisierte Architektur verwandelt implizites Wissen in strukturierte Daten. Ein wiederkehrendes Modul-Muster sagt einem Engineer im Code-Review dasselbe wie einem Agenten beim Lesen eines Verzeichnis-Listings. Die Funktion liegt hier. Die Tests liegen daneben. Der Vertrag steht in dieser Datei. Die Grenze endet bei dieser Import-Regel. Erklärung ist nicht nötig, weil die Struktur selbst das Signal ist.

Das ist nicht neu, nur weil KI im Spiel ist. Der Thoughtworks Technology Radar hat sich mit [KI-beschleunigter Schatten-IT](https://www.thoughtworks.com/radar/techniques/ai-accelerated-shadow-it) befasst und mit der Art, wie unstrukturierte KI-Beiträge technische Schulden in ohnehin fragilen Systemen aufhäufen. [METRs Studie 2025 zu KI-gestützter Entwickler-Produktivität](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) zeigt ein verwandtes Signal: erfahrene Entwickler waren mit aktivierten KI-Tools im Schnitt 19 % langsamer. Der erwartete Speedup blieb aus. Die Antwort liegt in mehr Struktur bei KI-Beiträgen, maschinenlesbar, durchgesetzt, konsistent genug, dass ein zustandsloser Reader sie aus einem Fragment erkennt.

Diese Konsistenz ist keine Frage der Ästhetik. Sie ist Information. Die Architektur kommuniziert mit dem Agenten in komprimierter Form, die ins Context-Window passt: *So sieht ein Modul aus. Das sind die Grenzen, die es nicht überschreiten darf.*

Stell das einer Codebasis gegenüber, in der ein Modul Active Record nutzt und Controller direkt Models aufrufen, ein zweites CQRS mit getrennten Lese- und Schreibpfaden fährt und ein drittes eine dünne Service-Schicht über einem ORM einsetzt. Jedes verlangt ein neues mentales Modell. Ein Architekt erstellt diese Modelle einmal und pflegt sie weiter. Ein Agent baut sie sich für jede Aufgabe neu zusammen und bezahlt das mit Tokens und Qualität.

## Agenten sind austauschbare Ressourcen

Architekten behandeln Agenten oft wie Mitarbeiter und liefern Context und Training, als würden Details über Sessions hinweg hängen bleiben. Das ist eine Kategorienverwechslung. Agenten sind zustandslos und austauschbar, und genau das ist ihr Vorteil.

Du kannst drei verschiedene Agenten von drei verschiedenen Anbietern an dieselbe Aufgabe setzen und die Ergebnisse vergleichen. Du kannst mitten im Workflow einen Claude-basierten gegen einen GPT-basierten austauschen oder einen abschalten und parallel einen anderen starten, ohne dich zu koordinieren, weil keiner die Historie der anderen braucht.

Das funktioniert nur, wenn die Umgebung, in der sie operieren, einheitlich ist. Eine standardisierte Architektur macht Agenten austauschbar. Eine custom gewachsene, kulturell geprägte bindet dich an den Agenten, der zufällig den meisten Context gecacht hat, oder an den Engineer, der bereit ist, dieselben zwanzig Dateien in jede neue Session zu laden.

Ehrlich umformuliert: Die Architektur muss klar genug strukturiert sein, dass jeder Agent, egal von welchem Anbieter, bei passender Konfiguration konsistente Ergebnisse liefert. Das ist eine Eigenschaft des Systems selbst; die Wahl des Modells ist nebensächlich. [Anthropics Leitlinien zu effektiven Agenten](https://www.anthropic.com/research/building-effective-agents) zeigen in dieselbe Richtung. Agenten arbeiten am besten, wenn die Umgebung klare Tool-Definitionen und klare Grenzen liefert, mit konsistentem Feedback auf jede Aktion. Struktur außerhalb des Agenten, durchgesetzt von der Pipeline, bleibt über Modellwechsel hinweg konsistent.

## Die zwei Zielgruppen des Architekten

Die Rolle des Architekten hat sich nicht geändert. Die Zielgruppe schon.

Bis vor Kurzem wurden Architekturentscheidungen für eine Art Leser geschrieben: für den Engineer, der den Code pflegen würde. Confluence-Seiten, ADRs, Whiteboard-Skizzen, Onboarding-Docs. Alles gerichtet an Menschen, die nachfragen können und implizites Wissen über die Zeit aufbauen.

KI-Beitragende sitzen jetzt mit am Tisch. Sie lesen kein Confluence. Sie stellen keine Rückfragen. Sie sehen nur, was im Context-Window steht, und handeln nach dem, was das System zulässt.

Architekten schreiben heute für zwei Zielgruppen.

Ein Engineer liest den Commit, den Pull Request, den Review-Kommentar. Ein Agent liest das Verzeichnis-Layout, den Import-Graph, die Fitness-Funktion, die seinen PR blockiert. Einem Engineer kann man in einem Meeting etwas erklären, und er erinnert sich daran. Ein Agent hat darauf keinen Zugriff. Dieselbe Architekturentscheidung muss so kodiert sein, dass der Agent ihr als Eigenschaft des Codes selbst begegnet.

Das ist keine kleine Verschiebung. Architekturentscheidungen müssen in einer Form ausdrückbar sein, die beide Zielgruppen lesen können. Sie müssen so dokumentiert sein, dass ein Mensch sie lesen kann, und so durchgesetzt, dass eine Maschine darauf reagieren kann. Eine Naming-Convention im Wiki ist eine Anweisung an Menschen. Eine Lint-Regel, die den falschen Namen ablehnt, ist eine Anweisung an beide.

Die Architekten, die das verinnerlichen, ziehen ihre Entscheidungen schon jetzt aus Wikis und Onboarding-Slides heraus. Eine Naming-Convention wird zur Linter-Regel. Ein Diagramm der Modul-Struktur wird zum tatsächlichen Verzeichnis-Layout.

Die Entscheidungen haben sich nicht geändert. Der Ort hat sich geändert. Architektur ist immer noch die Arbeit. Das Artefakt ist das System selbst, geschrieben so, dass eine Maschine darauf agieren kann ohne Übersetzung, und so, dass ein Mensch es weiterhin lesen und überarbeiten kann.

## Standardisierung ist ein einmaliger Kostenposten

An dieser Stelle wird das ökonomische Argument relevant, und unangenehm.

Eine standardisierte Architektur zu wählen heißt, signifikant im Voraus zu investieren. Du zahlst einmal, im Voraus, und weißt, was es kostet. Die Migration ist beherrschbar, der Scope ist begrenzt. Du kannst den Rollout über ein Quartal planen und nachverfolgen, wann das letzte nicht-konforme Modul entfernt wurde.

Abweichen von den Konventionen ist das Gegenteil. Niemand entscheidet sich bewusst, abzuweichen. Ein Repo startet sauber. Jemand liefert ein Feature unter Zeitdruck und überspringt das übliche Layout. Eine Team-Lead-Position wird neu besetzt, der oder die Neue bringt eine andere Stack-Erfahrung mit und mit ihr eine bevorzugte Struktur. Ein Refactoring beginnt und wird nie zu Ende gebracht. Zwei Jahre später existieren vier Muster nebeneinander in derselben Codebasis, jedes der Rest einer vernünftigen Entscheidung, keines davon durchgesetzt. Die Kosten sind verteilt und unsichtbar, sie tauchen erst auf, wenn ein neuer Entwickler fragt, welchem Muster zu folgen ist, und drei verschiedene Antworten bekommt.

Für einen zustandslosen Agenten ist Inkonsistenz auf eine Weise verheerend, wie es das für einen Engineer nicht ist. Ein Engineer geht auf Nummer sicher. Er überfliegt das README, fragt jemanden in Slack, schaut sich den letzten Merge an und fügt sich das Bild zusammen. Ein Agent macht nichts davon. Er sieht nur, was im Context-Window steht. Enthält das Window zwei inkompatible Muster, sucht er sich eines aus, meistens das falsche, und produziert Code, der lokale Tests besteht, aber bei der Integration bricht.

Das Argument ist einfach: Zahl die Kosten der Standardisierung früh, weil die Alternative nicht kostenlos ist. Die Alternative wird in kleineren Raten bezahlt, unbegrenzt.

Das ist dieselbe Logik, die hinter Datenbank-Normalisierung in der Speicherung und statischer Typisierung im Laufzeitverhalten steht. Es ist auch der Grund, warum es [Architectural Decision Records](https://adr.github.io/) gibt: damit die Begründung verfügbar bleibt, nachdem die Menschen weitergezogen sind, die sie aufgeschrieben haben. Lokale Flexibilität wird gegen globale Lesbarkeit eingetauscht. Sobald KI-Agenten ins Spiel kommen, hört globale Lesbarkeit auf, ein Nice-to-have zu sein. Sie entscheidet, ob die Agenten überhaupt funktionieren.

## Die Pipeline setzt die Architektur durch

Eine Confluence-Seite, die dein Modul-Layout beschreibt, ist eine Richtlinie. Ein Pipeline-Check, der einen Pull Request ablehnt, wenn das Layout verletzt wird, ist Durchsetzung. Der Unterschied zählt mehr für KI-Beitragende als für Entwickler, weil KI-Beitragende große Mengen Code produzieren und nicht entmutigt werden, wenn ein Reviewer ihren vierten Konventionsverstoß in einer Woche markiert.

Die Architektur definiert das Muster. CI setzt es durch. Der Agent folgt dem Muster, weil die Pipeline nichts anderes zulässt. Das ist das Modell, zu dem ich immer wieder zurückkehre: Architektur-Fitness-Funktionen, die bei jedem Commit laufen und jeweils eine Eigenschaft prüfen, die zählt. Keine Cross-Module-Imports. Jedes Modul exponiert seinen Port an der erwarteten Stelle. Keine Datenbank-Aufrufe außerhalb der Repository-Schicht. Jede public-Funktion hat einen Vertrags-Test.

Fitness-Funktionen sind nicht das einzige verfügbare Werkzeug, aber sie bieten die größte Flexibilität. Du kannst sie formen und erweitern, um fast alles zu erzwingen, was wichtig ist, egal ob der Code von einem Engineer oder einem externen Werkzeug kam.

Das Konzept ist Jahre älter als KI. Neal Ford, Rebecca Parsons und Patrick Kua haben den Fall in [Building Evolutionary Architectures](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) gemacht. Der Thoughtworks-Beitrag zu [fitness-function-driven development](https://www.thoughtworks.com/insights/articles/fitness-function-driven-development) von Paula Paul und Rosemary Wang bringt das in die Praxis. Werkzeuge wie [ArchUnit](https://www.archunit.org/) für Abhängigkeits- und Grenz-Checks und [Testcontainers](https://testcontainers.com/) für Adapter-Level-Integration machen diese Fitness-Funktionen in echten Pipelines durchsetzbar.

Was KI verändert, ist die Dringlichkeit. Ein Repository mit fünf Entwicklern überlebt mit Disziplin und Code-Reviews. Eine Codebasis mit fünf Engineers und drei Agenten, die dreißig Pull Requests am Tag produzieren, überlebt das nicht. Die Review-Kapazität ist erschöpft. Die Durchsetzung muss automatisch laufen.

Wenn die Pipeline die Architektur durchsetzt, passieren mehrere Dinge gleichzeitig. Reviewer hören auf, ihre Aufmerksamkeit auf Layout zu verschwenden, und konzentrieren sich auf Logik. Der Agent bekommt sofort konkretes Feedback zu jeder Abweichung. Die Architektur selbst hört auf zu zerfallen, weil Abweichungen genau bei dem Commit erkannt werden, der sie ausgelöst hat, statt Monate später.

Es gibt einen Folge-Effekt, der mich mehr interessiert. Sobald die Pipeline Struktur durchsetzt, schrumpft der Context, den du dem Agenten mitgibst. Du musst die Architektur nicht mehr im Prompt erklären. Du musst keine drei Beispiel-Module mehr anhängen, damit der Agent das Muster ableitet. Das Muster ist garantiert. Der Agent liest ein Modul, erkennt das Muster, weil das Muster konsistent ist, und arbeitet darin.

## Struktur ist die Botschaft

Die Verschiebung von rein menschlicher Entwicklung zu Entwicklung mit Engineers und Agenten verlangt keine neuen Architekturstile. Hexagonal, Clean, Onion und andere existieren seit Jahrzehnten. Was sich ändert, ist das Gewicht, das auf Konsistenz liegt.

In einem Team ohne Agenten ist Konsistenz eine Quality-of-Life-Verbesserung, die sich über die Zeit auszahlt. In einem Hybrid-Team mit zustandslosen Agenten wird Konsistenz zur Bandbreite deines Kommunikationskanals. Jedes Modul, das dem Muster folgt, macht jeden Agenten effektiver. Jede Ausnahme verkleinert das nutzbare Context-Window für jede künftige Aufgabe.

Die Architekten, die das zuerst verinnerlichen, werden klarere Codebases haben und vorhersagbarere Migrationen. Die, die Architektur weiterhin als Stil-Frage behandeln, werden die nächsten drei Jahre damit verbringen, ihr System in jedem Prompt neu zu erklären.

Architektur ist Daten. Standardisierte Daten lassen den Agenten so produktiv beitragen wie einen neuen Engineer nach abgeschlossenem Onboarding. Inkonsistente Daten zwingen den Agenten, den größten Teil seiner Tokens darauf zu verwenden, die Konventionen zu rekonstruieren, und lassen sehr wenig für die eigentliche Arbeit übrig.

Die Wahl ist eine strukturelle. Die Kosten werden entweder im Voraus bezahlt, in Standardisierungs-Arbeit, oder fortlaufend, in Zeit, die du aufwendest, um den Mangel daran auszugleichen.
