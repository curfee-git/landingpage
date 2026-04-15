---
title: "Deine Pipeline war nie für KI-Commits gemacht"
excerpt: "Das eigentliche Risiko bei KI-generiertem Code ist nicht die Geschwindigkeit. Es ist eine Pipeline, die für eine Zeit gebaut wurde, in der Entwickler bestimmt haben, wie schnell Code entsteht – und die jetzt jede Annahme dieser Zeit offenlegt."
createdAt: 2026-04-15
topic: "KI-gestützte Entwicklung"
tags:
  - Pipeline
  - CI
  - Fitness Functions
  - KI
  - Architektur
draft: false
featured: true
---

Das eigentliche Risiko bei KI-generiertem Code ist nicht die Geschwindigkeit. Es ist eine Pipeline, die für eine andere Zeit entworfen wurde – eine Zeit, in der Entwickler den Code geschrieben haben und das Volumen an Pull Requests davon begrenzt war, wie schnell sie tippen, denken und Kontexte wechseln konnten.

Diese Annahme gilt nicht mehr. Sobald KI Code generiert, entstehen Commits schneller, als die ursprüngliche Struktur verarbeiten kann. Der Durchsatz steigt. Das Review-Gate nicht. Irgendwo muss etwas nachgeben, und in den meisten Organisationen gibt entweder die Qualität nach, die Moral, oder beides.

Das Muster, das immer wiederkehrt: Teams nehmen an, der Engpass sei verhaltensbedingt. Ist er nicht. Er ist strukturell.

## Warum die alte Pipeline nicht mehr passt

Die meisten heute produktiven CI/CD-Pipelines haben eine gemeinsame Form. Sie setzen voraus, dass Entwickler die Konventionen im Kopf haben. Sie verlassen sich auf Reviewer, um Verstöße zu finden. Sie behandeln CI als Sicherheitsnetz für Testfehler, nicht als strukturellen Filter für Architekturentscheidungen. Die eigentliche Durchsetzung passiert im Kopf eines Entwicklers, in einem Fünf-Minuten-Fenster zwischen anderen Aufgaben.

Dieses Design hat funktioniert, weil das Volumen begrenzt war. Ein erfahrener Entwickler konnte die Systemlandschaft im Kopf behalten, die Namenskonvention kennen, prüfen, ob ein neuer Service die Schichtregeln einhält, und widersprechen, wenn etwas abdriftete. Die Pipeline musste die Struktur nicht durchsetzen, weil die Entwickler davor es taten.

Sobald KI-gestützte Code-Generation ins Spiel kommt, kippt diese Balance. Ein Team, das mit der vierfachen Geschwindigkeit liefert, macht nicht das Vierfache an Review. Dieselbe Review-Kapazität verteilt sich auf mehr Commits – also bleibt pro Änderung weniger Zeit zum Prüfen. Was früher durch Tippgeschwindigkeit begrenzt war, wird jetzt nur noch durch die Iterationsgeschwindigkeit von Prompts begrenzt – und die ist faktisch unbegrenzt.

Die Lücke zwischen dem, was die Pipeline durchlässt, und dem, was die Architektur verlangt, wird zur operativen Realität der Codebasis. Was immer die Pipeline durchlässt, ist der De-facto-Standard, egal was in der Dokumentation steht.

## Warum strengeres Review den Flaschenhals nur verschiebt

Eine gängige Reaktion auf steigendes Volumen an KI-generierten Commits ist, das Review-Gate enger zu ziehen. Noch einen Approver dazu. Ein Sign-off von einem erfahrenen Entwickler verlangen. Eine Pre-Review-Checkliste einführen. Die Review-SLA verlängern.

Das funktioniert – aber es verschiebt den Engpass zu den Entwickler.

Der Durchsatz fällt, weil jeder Pull Request jetzt länger auf Aufmerksamkeit wartet. Technische Schulden wachsen weiter, nur langsamer. Das Team spürt die Reibung: Reviewer-Müdigkeit, Merge Queues, erfahrene Entwickler, die ihre Tage in Review-Tools verbringen statt Systeme zu entwerfen. Die Moral leidet auf eine sehr spezifische Art: Wer als Architekt eingestellt wurde, wird zum Sachbearbeiter für Maschinen-Output.

Ein Team, das als Antwort auf steigendes Volumen das Review strenger macht, sieht üblicherweise, wie der Durchsatz sinkt, während die Schulden trotzdem weiter wachsen. Die Rechnung ändert sich nicht. Mehr Commits, die auf ein Review-Gate mit fester Kapazität treffen, ergeben eine Warteschlange, keine Qualität. Und die Warteschlange selbst wird zum nächsten Engpass.

Die Einschränkung ist strukturell, nicht verhaltensbedingt. Mehr Review-Zeit in eine Pipeline zu kippen, die rund um diese Review-Zeit gebaut wurde, verschiebt den Druckpunkt – beseitigt ihn aber nicht.

Wenn dir das bekannt vorkommt, ist [eine strukturelle Diagnose](https://curfee.com) oft der schnellere Weg, zu sehen, wo die Pipeline die Verschiebung gerade noch auffängt und wo sie einknickt.

## Was KI-generierter Code tatsächlich offenlegt

Eine KI wird nicht müde. Sie vergisst die Namenskonvention nicht. Sie erinnert sich aber auch nicht an sie. Sie produziert exakt das, was das System durchlässt.

Entwickler haben strukturelles Wissen verinnerlicht. Sie wissen, wie „sauber" in dieser Codebasis aussieht, auch wenn es nirgendwo dokumentiert ist. Sie korrigieren sich selbst. Eine KI korrigiert sich nicht gegen ungeschriebene Regeln – sie korrigiert sich gegen die Signale, die das System zurückgibt.

Wenn die Pipeline einen Pull Request mit fehlenden Contract Tests durchlässt, hat das System der KI gerade gesagt, dass Contract Tests optional sind. Wenn die Pipeline Code mit ungetypten Schnittstellen merged, hat das System ungetypte Schnittstellen als akzeptabel definiert. Wenn eine Architekturschicht verletzt wird und nichts kaputtgeht, ist die Schicht Dekoration.

Im Maßstab wird diese Feedback-Schleife zur Architektur. Nicht die Diagramme. Nicht die Decision Records. Die Toleranz der Pipeline ist der reale Architekturvertrag, und KI-generierter Code findet jede seiner Kanten – konsistent, in Volumen.

Deshalb ist die Pipeline die Angriffsfläche, nicht die KI. Die KI produziert gegen das Signal, das das System liefert. Ändere das Signal, und der Output ändert sich mit.

## Das Nicht-Verhandelbare kodifizieren

Wenn die Pipeline strukturelle Entscheidungen durchsetzen muss, für die sie nie gebaut war, verschiebt sich die Durchsetzung: vom Review-getriebenen zum System-getriebenen Modus. Entscheidungen, die bisher im Kopf eines Entwicklers lebten, werden präzise genug kodiert, dass eine Maschine sie prüfen kann.

Die Bausteine sind konkret, und das meiste davon gibt es seit Jahren – es wird nur zu wenig genutzt.

[Architektonische Fitness Functions](https://martinfowler.com/articles/evo-arch-forward.html) kodieren strukturelle Regeln als ausführbare Checks. Eine Fitness Function kann prüfen, dass die Domain-Schicht niemals aus der Infrastruktur-Schicht importiert, dass kein Service direkt die Datenbank eines anderen Services anspricht, dass zyklische Abhängigkeiten zwischen Modulen gar nicht erst entstehen. Neal Fords Arbeit und der [ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar/techniques/architectural-fitness-function) behandeln das als Kernpraxis für evolutionäre Architektur, und [InfoQ hat die Muster dokumentiert](https://www.infoq.com/articles/fitness-functions-architecture/), wie man sie in CI-Pipelines einbettet.

[Contract Testing](https://martinfowler.com/bliki/ContractTest.html) prüft bei jeder Änderung, ob der vereinbarte Vertrag zwischen zwei Services noch hält. Wenn ein Producer ein Schema ohne Zustimmung des Consumers ändert, schlägt die Pipeline fehl. Die Entscheidung "Services einigen sich auf Schemata, bevor sie sie ändern" wird bei jedem Commit durchgesetzt, nicht in Slack verhandelt.

Coverage-Schwellen, die blockieren statt warnen, machen aus einem weichen Signal ein hartes Gate. Ein Coverage-Abfall unter die Schwelle lässt den Build scheitern. Kein gelber Warnhinweis. Kein Kommentar im Review. Eine rote Pipeline.

Type Checking an Modulgrenzen fängt Vertragsverletzungen vor der Laufzeit ab. Abhängigkeitsregeln, durchgesetzt mit Tools wie ArchUnit, dependency-cruiser oder sprach-eigenen Lintern, blockieren Imports, die Schichten überschreiten, die sie nicht überschreiten sollten. Security-Scans lassen den Build scheitern, wenn eine bekannte Schwachstelle in eine Dependency gelangt. Performance-Budgets lassen den Build scheitern, wenn eine Seitengröße oder Latenzschwelle überschritten wird.

Um nur einige zu nennen.

Das Muster ist bei allen identisch: Die Entscheidung wird in ausführbarer Form festgehalten. Die Pipeline setzt sie durch. Grün oder rot. Niemand muss sich etwas merken.

## Der ehrliche Teil

Ja, einige Entwickler-Aufgaben verschwinden.

Namensverstöße abfangen, Schichtabhängigkeiten manuell prüfen, Boilerplate reviewen, prüfen, ob die Testdatei neben der Quelldatei liegt, bestätigen, dass der neue Endpoint den REST-Konventionen folgt, die das Team letztes Jahr vereinbart hat – die Pipeline übernimmt all das. Für Reviewer, die den Großteil ihrer Zeit damit verbracht haben, verändert sich die Rolle spürbar.

Diese Veränderung ist nicht abstrakt. Ein Reviewer, dessen Wertbeitrag darin bestand, strukturelle Abweichungen im Pull-Request-Review zu finden, hat weniger zu tun, wenn die Pipeline das zuerst fängt. Ein Entwickler, dessen inoffizielle Rolle das Hüten des strukturellen Wissens war, muss es nicht mehr im Kopf behalten – und bekommt dafür auch keine Anerkennung mehr. Die informelle Macht, die aus dem Wissen um die ungeschriebenen Regeln kam, löst sich auf, sobald die Regeln als ausführbare Checks geschrieben sind.

Was bleibt – und was wertvoller wird – ist Urteilskraft. Architekturentscheidungen. Zu wissen, welche Grenzen man zieht und warum. Zu verstehen, was das System niemals tolerieren sollte, und das präzise genug zu kodieren, damit eine Maschine es durchsetzen kann. Eine neue Fitness Function zu formulieren ist Architekturarbeit. Zu entscheiden, welche Invarianten geschützt werden, ist Architekturarbeit. Eine Coverage-Schwelle anzuheben oder zu senken, abhängig vom Risikoprofil des Codes, ist Architekturarbeit.

Die Entwickler, die die Leitplanken definiert haben, werden nicht von der Pipeline ersetzt. Sie sind Teil davon.

Die Verschiebung verändert, was Seniorität in der Entwicklung bedeutet. Weniger Zeit in Review-Warteschlangen. Mehr Zeit an der Frage, was das System durchsetzen soll und warum. Das ist der härtere Job, der folgenreichere, und der, für den die meisten Entwickler ursprünglich eingestellt wurden.

## Warum Geschwindigkeit aufhört, das Risiko zu sein

Dann spielt Geschwindigkeit keine Rolle mehr.

KI-Coding-Tools können Pull Requests einreichen, so viele sie wollen. Rote Pipeline: abgelehnt, iteriert. Grüne Pipeline: gemerged. Die Review-Zeit pro Commit sinkt, weil die strukturellen Checks passieren, bevor ein Reviewer den Diff überhaupt öffnet. Reviewer prüfen Absicht und Design, nicht mehr, ob die Benennung stimmt oder die Schicht eingehalten wurde.

Der kontraintuitive Teil: KI-generierter Code wird schneller, sobald die Struktur nicht verhandelbar ist. Kein Review-Engpass mehr vor einer sauberen Änderung. Die KI iteriert einfach weiter, bis das System grün meldet. Die Iterationsschleife, die früher Stunden gedauert hat – einreichen, auf Review warten, Kommentare bekommen, überarbeiten, wieder warten – schrumpft auf Minuten, weil das Feedback automatisch und sofort kommt.

Teams, die diesen Zustand erreichen, berichten von einer spezifischen Verschiebung im Gefühl. Die Angst rund um KI-generierten Code lässt nach. Die Reviewer-Müdigkeit lässt nach. Was bleibt, ist eine Codebasis, die ihre Form hält, auch wenn das Commit-Volumen ausschlägt, auch wenn neue Commits – von Entwickler oder von KI-Coding-Tools – ohne institutionelles Gedächtnis dazukommen.

Das zugrundeliegende Prinzip ist einfach. Struktur, die davon abhängt, dass Entwickler sich erinnern, bricht in dem Moment, in dem die Aufmerksamkeit woanders hinwandert. Struktur, die in der Pipeline kodiert ist, gibt von selbst Feedback, übersteht Reorganisationen, übersteht neue Quellen von Code und macht die Architektur auffindbar und angreifbar, wenn sie sich ändern muss.

## Wo das Review-Gate am Ende steht

Review verschwindet nicht. Es wandert nach vorne, und es verändert seine Natur.

Nach vorne heißt: Die Architekturentscheidungen werden explizit getroffen, bevor Code geschrieben wird – die Fitness Function, der Contract, die Abhängigkeitsregel, das Performance-Budget. Dieses Gespräch findet einmal statt, zur Design-Zeit, mit den Entwickler, die es führen sollten. Das Ergebnis ist ein ausführbares Artefakt, keine Confluence-Seite.

Natur heißt: Das Review, das bleibt, dreht sich um Absicht und Design, nicht um strukturelle Compliance. Ein Reviewer schaut auf einen grünen Pull Request und fragt, ob die Änderung Sinn ergibt, ob die Abstraktion stimmt, ob der Ansatz zu der Richtung passt, in die das System geht. Das sind die Fragen, die erfahrene Entwickler immer hätten stellen sollen. Die Pipeline räumt das Rauschen weg, damit das Signal ankommt.

Teams, die diesen Schritt gehen, stellen fest, dass ihre Review-Kultur besser wird, nicht schlechter. Reviewer beschäftigen sich mit Änderungen, die etwas bedeuten. Entwickler und KI-Coding-Tools bekommen gleichermaßen sofortiges strukturelles Feedback statt verzögertem Reviewer-Feedback. Die Systemlandschaft wird explizit, versioniert und testbar. Was implizit war, wird sichtbar. Was sichtbar war, wird angreifbar.

Diese Sichtbarkeit unterschätzen die meisten Teams. Eine implizite Entscheidung, die im kollektiven Gedächtnis vergraben liegt, lässt sich nicht angreifen, weil sie sich nicht finden lässt. Eine explizite Entscheidung, die als Pipeline-Check kodiert ist, lässt sich reviewen, verfeinern oder bewusst entfernen, wenn sie obsolet wird. Durchsetzung und Auffindbarkeit sind derselbe Mechanismus.

Das ist die Arbeit, die [Curfee](https://curfee.com) mit Unternehmen macht, deren Pipelines für eine andere Zeit gebaut wurden und deren Commit-Volumen dem ursprünglichen Design entwachsen ist – sichtbar zu machen, wo die Pipeline stillschweigend Architekturentscheidungen durchsetzt und wo nicht, und dann zu definieren, was das System durchsetzen soll, damit Entscheidungen halten, ohne von der Aufmerksamkeit eines einzelnen Entwickler abzuhängen.

Wenn die Struktur die letzte Verteidigungslinie ist, wird Geschwindigkeit zum Feature – nicht zum Risiko.
