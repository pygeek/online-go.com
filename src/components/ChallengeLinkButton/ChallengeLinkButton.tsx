/*
 * Copyright (C) 2012-2022  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from "react";

import { pgettext } from "translate";

export function ChallengeLinkButton(): JSX.Element {

    copyChallengeLinkURL(ack_target: HTMLElement, uuid: string): void {
        const challenge_link =
            window.location.protocol +
            "//" +
            window.location.hostname +
            (window.location.port ? ":" + window.location.port : "") +
            `/welcome/?linked-challenge=${uuid}`;

        try {
            navigator.clipboard
                .writeText(challenge_link)
                .then(() =>
                    popover({
                        elt: (
                            <span className="challenge-link-copied">
                                {pgettext(
                                    "They clicked the button to copy a challenge link, we copied it into their clipboard",
                                    "Challenge Link Copied!",
                                )}
                            </span>
                        ),
                        below: ack_target,
                        closeAfter: 2000,
                        animate: true,
                        minWidth: 180,
                    }),
                )
                .catch(() =>
                    // Uh-oh, their browser won't let us access the clipboard?
                    // ... give them the whole thing to copy...
                    this.showChallengeLink(challenge_link, ack_target),
                );
        } catch(e) {
            // Their browser doesn't even know about navigator.clipboard?
            this.showChallengeLink(challenge_link, ack_target);
        }
    };

    showChallengeLink(challenge_link: string, target: HTMLElement) {
        popover({
            elt: (
                <div className="challenge-link-copy">
                    {pgettext(
                        "This is the label for a link (URL) that they created",
                        "Challenge link:",
                    )}
                    <br />
                    {challenge_link}
                </div>
            ),
            below: target,
            minWidth: 300,
        });
    }

    /* render */
    return (
        <div></div>
    );
}
