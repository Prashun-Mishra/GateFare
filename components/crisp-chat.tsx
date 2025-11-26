"use client"

import { useEffect } from "react"

export const CrispChat = () => {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
            // @ts-ignore
            window.$crisp = [];
            // @ts-ignore
            window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

            (function () {
                var d = document;
                var s = d.createElement("script");

                s.src = "https://client.crisp.chat/l.js";
                s.async = true;
                d.getElementsByTagName("head")[0].appendChild(s);
            })();
        }
    }, [])

    return null
}
