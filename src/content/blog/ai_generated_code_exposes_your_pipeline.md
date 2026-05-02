---
title: "KI-generierter Code legt offen, was Pipelines aus einer anderen Ära nicht mehr leisten"
excerpt: "Deine Pipeline wurde für eine Zeit gebaut, in der Engineers das Tempo bestimmten, mit dem Code ankam. KI-generierter Code kommt schneller, als die Pipeline ihn handhaben kann, und die Grenzen zeigen sich genau dort, wo das ursprüngliche Design einen menschlichen Reviewer vorausgesetzt hat."
createdAt: 2026-04-15
topic: "KI-gestützte Entwicklung"
tags:
  - Pipeline
  - CI
  - Fitness Functions
  - KI
  - Architektur
---

Die Pipeline um deinen Code wurde für eine Zeit gebaut, in der Engineers das Tempo bestimmten, mit dem Code ankam. KI-generierter Code kommt schneller, als diese Pipeline ihn verarbeiten kann, und die Grenzen zeigen sich genau dort, wo das ursprüngliche Design einen Menschen in der Schleife vorausgesetzt hat.

Sobald KI anfängt, Code zu generieren, kommen Commits schneller herein, als die ursprüngliche Struktur sie verarbeiten kann. Der Durchsatz ändert sich. Der Review-Prozess nicht. In den meisten Unternehmen leidet die Qualität, die Moral, oder beides.

## Warum die alte Pipeline nicht mehr passt

Die meisten CI/CD-Pipelines, die heute produktiv laufen, haben dieselbe Form. Sie vertrauen darauf, dass Engineers sich an Konventionen erinnern, und verlassen sich auf Reviewer, um Verstöße zu erkennen. CI wird als Sicherheitsnetz für Test-Fehler behandelt, nicht als struktureller Filter für Architekturentscheidungen. Die meiste echte Durchsetzung passiert im Kopf eines Engineers, in einem fünfminütigen Review-Fenster zwischen anderen Aufgaben.

Dieser Ansatz funktionierte, weil der Umfang begrenzt war. Ein Lead-Engineer konnte die Systemlandschaft im Kopf behalten, prüfen, ob ein neuer Service den Schichten-Regeln folgt, und eingreifen, wenn etwas auseinanderlief. Die Pipeline musste keine Struktur durchsetzen, weil Engineers das stromaufwärts schon erledigten.

KI-generierter Code zerlegt dieses Gleichgewicht. Ein Team, das viermal so schnell liefert wie vorher, führt nicht viermal so viele Code-Reviews durch. Derselbe Review-Aufwand verteilt sich auf mehr Commits, und für jede Änderung bleibt weniger Zeit. Was früher durch Tippgeschwindigkeit begrenzt war, wird jetzt durch Prompt-Iteration bestimmt, und die hat keine obere Grenze.

Die Lücke zwischen dem, was die Pipeline toleriert, und dem, was die Architektur verlangt, definiert die operative Realität der Codebasis. Was die Pipeline durchlässt, ist der De-facto-Standard, egal was in der Doku steht.

## Warum strengere Reviews den Engpass nur verschieben

Die übliche Antwort auf wachsendes Volumen an KI-generiertem Code: das Review verschärfen. Einen zusätzlichen Reviewer hinzuziehen oder die Freigabe durch einen Senior verlangen. Das Review-SLA verlängern.

Das funktioniert. Es verschiebt den Engpass auch zu den Engineers.

Der Durchsatz fällt, weil jeder Pull Request länger auf Aufmerksamkeit wartet. Technische Schulden sammeln sich weiterhin an, nur langsamer. Das Team spürt die Reibung. Reviewer-Müdigkeit und Merge-Queues bauen sich auf. Senior-Engineers verbringen ihre Tage in Review-Tools, statt Systeme zu entwerfen. Die Moral fällt auf konkrete Weise: Engineers, die als Architekten eingestellt wurden, werden zu Sachbearbeitern für Maschinen-Output.

Die Mathematik ändert sich nicht. Mehr Einreichungen in einen Review-Apparat mit fester Kapazität produzieren einen Backlog, keine höhere Qualität. Der Backlog wird zum nächsten Engpass.

Reviewer zu einer Pipeline hinzuzufügen, die nie für dieses Volumen gebaut wurde, ist wie zusätzliche Kassen aufzumachen, weil die Schlange lang ist. Es verschiebt den Druckpunkt, aber es entfernt ihn nicht. Der Engpass steckt in der Pipeline selbst.

## Was KI-generierter Code offenlegt

Eine KI wird nicht müde und vergisst die Naming-Convention nicht. Sie erinnert sich auch nicht an sie. Sie produziert genau das, was das System zulässt.

Engineers verinnerlichen, wie „sauber" in einer Codebasis aussieht, selbst wenn es nirgends aufgeschrieben ist, und sie korrigieren sich gegen diesen inneren Standard. Eine KI kann sich nicht gegen ungeschriebene Regeln korrigieren. Sie korrigiert sich gegen die Signale, die das System zurückgibt.

Akzeptiert die Pipeline einen Pull Request mit fehlenden Vertrags-Tests, liest die KI das als Signal, dass Vertrags-Tests optional sind. Untypisierte Grenzen, die gemerged werden, werden zu akzeptablen. Architekturschichten, die ohne Bruch verletzt werden, stellen sich als rein dekorativ heraus.

Im großen Stil definiert dieser Feedback-Loop die Architektur. Die Diagramme und die Decision Records tun das nicht. Die Toleranz der Pipeline ist es, die in der Praxis regiert, und KI-generierter Code findet jede Kante davon zuverlässig.

Die Pipeline ist der Ausgangspunkt. Die KI folgt den Signalen, die die Pipeline zurückgibt. Ändere die Signale, und der Output ändert sich.

## Die nicht verhandelbaren Teile in Code gießen

Wenn die Pipeline strukturelle Regeln durchsetzen muss, für die sie nie gebaut wurde, verschiebt sich Durchsetzung von review-getrieben zu system-getrieben. Entscheidungen, die im Kopf eines Entwicklers existierten, werden präzise genug kodiert, dass eine Maschine sie verifizieren kann.

[Architektur-Fitness-Funktionen](https://martinfowler.com/articles/evo-arch-forward.html) kodieren strukturelle Regeln als ausführbare Checks. Eine Fitness-Funktion kann sicherstellen, dass die Domain-Schicht niemals von der Infrastruktur importiert, dass kein Service direkt mit der Datenbank eines anderen Services kommuniziert oder dass keine zyklischen Abhängigkeiten existieren. Neal Fords Arbeit und der [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar/techniques/architectural-fitness-function) behandeln das als Kernpraxis evolutionärer Architektur. [InfoQ hat die Muster dokumentiert](https://www.infoq.com/articles/fitness-functions-architecture/), wie sich das in CI einbetten lässt.

[Contract Tests](https://martinfowler.com/bliki/ContractTest.html) stellen sicher, dass der Vertrag zwischen zwei Services über Änderungen hinweg gültig bleibt. Ändert ein Producer ein Schema ohne Zustimmung des Consumers, fällt die Pipeline. Die Entscheidung „Services einigen sich auf Schemata, bevor sie sie ändern" wird bei jedem Commit durchgesetzt, statt in Slack ausgehandelt zu werden.

Coverage-Schwellen, die blockieren statt nur warnen, machen aus einem weichen Signal eine harte Barriere. Ein Abfall unter den Schwellwert lässt den Build scheitern, kein gelber Hinweis, kein Review-Kommentar. Die Pipeline wird einfach rot.

Type-Checks an Modulgrenzen fangen Vertragsverletzungen vor der Laufzeit ab. Abhängigkeitsregeln, durchgesetzt mit Werkzeugen wie ArchUnit, dependency-cruiser oder sprach-eigenen Lintern, blockieren Imports, die Schichten überqueren, die sie nicht überqueren sollten. Sicherheits-Scans und Performance-Budgets lassen den Build scheitern, wenn Schwachstellen gefunden oder Schwellen überschritten werden.

Das Muster ist bei allen identisch. Eine Entscheidung wird in ausführbarer Form festgehalten, und die Pipeline setzt sie durch. Grün oder rot, kein Entwickler muss sich daran erinnern.

## Was das kostet

Ein Teil dessen, was Entwickler früher gemacht haben, fällt weg.

Naming-Verstöße erkennen, Schicht-Abhängigkeiten prüfen, Boilerplate reviewen, kontrollieren, ob Test-Dateien neben den Quellen liegen, prüfen, ob ein neuer Endpoint den REST-Konventionen folgt, auf die sich das Team letztes Jahr geeinigt hat. Die Pipeline übernimmt das alles. Für Entwickler, die den größten Teil ihrer Zeit mit diesen Aufgaben verbracht haben, ändert sich die Rolle deutlich.

Diese Veränderung ist nicht abstrakt. Ein Reviewer, dessen Wert daraus kam, strukturelle Inkonsistenzen abzufangen, hat weniger zu tun, wenn die Pipeline sie zuerst abfängt. Ein Staff-Engineer, dessen inoffizielle Rolle das Bewahren des Architektur-Gedächtnisses war, muss dieses Gedächtnis nicht mehr halten und bekommt auch keine Anerkennung mehr dafür. Die informelle Macht, die aus dem Wissen um ungeschriebene Regeln kam, löst sich auf, sobald diese Regeln zu ausführbaren Checks werden.

Was bleibt und an Wert gewinnt, ist Urteilsvermögen. Zu wissen, welche Grenzen man zieht und warum. Zu verstehen, was das System niemals tolerieren darf, und es präzise genug zu kodieren, dass eine Maschine es durchsetzen kann. Die Arbeit, neue Fitness-Funktionen zu definieren und Coverage-Schwellen risikobasiert nachzukalibrieren.

Die Engineers, die die Leitplanken definiert haben, werden nicht von der Pipeline ersetzt. Die Pipeline enthält ihre Entscheidungen in ausführbarer Form, was bedeutet, dass sie Teil davon sind.

Das verschiebt, was Seniorität bedeutet. Engineers verbringen weniger Zeit in Review-Queues und mehr Zeit mit der Frage, was das System durchsetzen soll und warum. Die Arbeit ist anspruchsvoller und die Folgen sind größer, aber genau für diese Arbeit sind die meisten Engineers ursprünglich eingestellt worden.

## Warum Tempo aufhört, das Risiko zu sein

Sobald die Struktur von der Pipeline durchgesetzt wird, ist Tempo kein Risiko mehr.

KI-Coding-Werkzeuge können endlos Pull Requests einreichen. Die Pipeline lehnt ab, was ihre Checks nicht besteht, und merged, was passt. Der Aufwand pro Commit fällt für Entwickler, weil strukturelle Checks passieren, bevor ein Reviewer den Diff aufmacht. Reviewer konzentrieren sich auf Intent und Design statt auf Naming oder Schicht-Treue.

Der kontraintuitive Teil: KI-generierter Code wird schneller, sobald die Struktur nicht mehr verhandelbar ist. Kein Entwickler-Engpass vor einer sauberen Änderung. Die KI iteriert, bis das System zustimmt. Der Feedback-Loop, der früher Stunden dauerte (einreichen, auf das Review warten, Kommentare bekommen, überarbeiten, wieder warten), schrumpft auf Minuten, weil das Feedback automatisch ist.

Teams, die diesen Zustand erreichen, berichten von einer Verschiebung darin, wie sich Beiträge anfühlen. Die Angst vor KI-generiertem Code lässt nach, und Reviewer-Müdigkeit verschwindet. Das Ergebnis ist eine Codebasis, die konsistent bleibt, während das Volumen wächst und neue Commits ohne institutionelles Gedächtnis ankommen.

Eine Struktur, die auf dem Gedächtnis der Engineers fußt, fällt in dem Moment, in dem die Aufmerksamkeit woanders hingeht. Eine Struktur, die in der Pipeline kodiert ist, gibt automatisches Feedback und überlebt Reorganisationen. Sie bleibt auffindbar, wenn sie sich ändern muss.

## Was vom Review-Gate übrig bleibt

Code Review verschwindet nicht. Es verschiebt sich nach vorne.

Architekturentscheidungen werden explizit getroffen, bevor Code geschrieben wird. Die Fitness-Funktion, der Vertrag, die Abhängigkeitsregel, das Performance-Budget. Die Diskussion findet einmal statt, während des Designs, mit den Personen, die im Raum sein sollten. Das Resultat ist ein ausführbares Artefakt, keine Confluence-Seite.

Was zur Review-Zeit bleibt, ist Intent und Design statt struktureller Konformität. Ein Reviewer schaut sich einen grünen Pull Request an und fragt, ob die Änderung Sinn ergibt und ob die Abstraktion zur Richtung des Systems passt. Das sind die Fragen, die erfahrene Engineers von Anfang an hätten stellen sollen. Die Pipeline entfernt das strukturelle Rauschen aus dem Review, damit die Reviewer sich auf diese Fragen konzentrieren können.

Teams, die diese Verschiebung machen, erleben, dass die Review-Kultur sich verbessert statt verschlechtert. Reviewer fokussieren sich auf bedeutsame Änderungen. Engineers und KI-Werkzeuge bekommen beide sofortiges strukturelles Feedback statt verzögerter Kommentare von Reviewern. Die Systemlandschaft wird explizit und versionsgeführt. Was vorher implizit war, kann jetzt hinterfragt und geändert werden, wenn es keinen Sinn mehr ergibt.

Der Governance-Effekt wird oft unterschätzt. Eine implizite Entscheidung, die sich im kollektiven Gedächtnis versteckt, lässt sich nicht hinterfragen, weil sie nicht zu finden ist. Ein neuer Entwickler weiß gar nicht, dass er sie hinterfragen müsste, und ein Berater, der die Architektur reviewt, sieht sie überhaupt nicht. Mit der Zeit vergisst das Team, wer die Entscheidung getroffen hat und warum. Eine explizite Entscheidung, in einen Pipeline-Check kodiert, funktioniert anders. Sie kann gelesen, hinterfragt, verfeinert und entfernt werden, wenn sie ihren Sinn verliert. Durchsetzung und Auffindbarkeit passieren über denselben Mechanismus.

Sobald die Struktur von der Pipeline durchgesetzt wird, hört der Durchsatz von KI-generiertem Code auf, etwas zu sein, das man von Hand verwalten muss. Jeder Commit läuft durch dieselben Checks, egal wer oder was ihn erzeugt hat.
