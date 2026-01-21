document.getElementById("generate").addEventListener("click", () => {
  const status = document.getElementById("status");
  status.innerText = "Processing...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) {
      status.innerText = "No active tab.";
      return;
    }

    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: "GENERATE",
        template: "Hi {{name}}, thanks for connecting! Great to connect with you.",
        delay: 2
      },
      (response) => {
        if (chrome.runtime.lastError) {
          status.innerText =
            "Open a LinkedIn profile and message window.";
          return;
        }

        if (response?.success) {
          status.innerText =
            "Message inserted. Click Send manually.";
        } else {
          status.innerText =
            response?.error || "Something went wrong.";
        }
      }
    );
  });
});
