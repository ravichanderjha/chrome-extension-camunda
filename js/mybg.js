chrome.runtime.onMessage.addListener(function (b, k, c) {
    "openPage" === b.action && chrome.storage.local.set({ leads: b.data }, function () { chrome.tabs.create({ url: "dashboard.html" }) }); if ("access" === b.action) return (async () => {
        const d = b.data.url, e = new AbortController, f = setTimeout(() => { e.abort() }, 1E4); try {
            new URL(d); const a = await Promise.race([fetch(`${d}`, { signal: e.signal, redirect: "follow" }), new Promise((l, g) => setTimeout(() => g(Error("timeout")), 1E4))]); console.log(`visit ${d}, ok: ${a.ok}, status: ${a.status}`);
            if (a.ok) { var h = await a.text(); c(h) } else c("")
        } catch (a) { console.log(a) } finally { clearTimeout(f), c("") }
    })(), !0
});

