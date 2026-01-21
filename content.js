// Prevent duplicate runs
if (window.__linkedinSmartGreetRunning) {
  console.log("Smart Greet already running. Ignoring duplicate call.");
} else {
  window.__linkedinSmartGreetRunning = true;
}
// ================================
// LinkedIn Profile Detection
// ================================

function getProfileId() {
  const url = window.location.href;
  const match = url.match(/linkedin\.com\/in\/([^/?]+)/);
  return match ? match[1] : null;
}

// ================================
// Profile Info Extraction
// ================================

function getName() {
  const el = document.querySelector(
    "h1, .text-heading-xlarge"
  );
  return el?.innerText.trim() || "there";
}

function getCompany() {
  const el = document.querySelector(
    ".text-body-medium, .pv-text-details__right-panel"
  );
  if (!el) return null;

  const text = el.innerText || "";
  if (text.includes(" at ")) {
    return text.split(" at ").pop().trim();
  }

  return null;
}

// ================================
// Message Builder
// ================================

function buildMessage(template, name, company) {
  return template
    .replaceAll("{{name}}", name)
    .replaceAll("{{company}}", company || "you");
}

// ================================
// Message Box Handling
// ================================

function waitForMessageBox(timeout = 6000) {
  return new Promise((resolve) => {
    const start = Date.now();

    const interval = setInterval(() => {
      const box = document.querySelector(
        'div[role="textbox"][contenteditable="true"]'
      );

      if (box) {
        clearInterval(interval);
        resolve(box);
      }

      if (Date.now() - start > timeout) {
        clearInterval(interval);
        resolve(null);
      }
    }, 300);
  });
}

async function insertMessage(message) {
  const box = await waitForMessageBox();
  if (!box) return false;

  box.focus();

  // Clear existing content safely
  box.dispatchEvent(
    new InputEvent("input", {
      bubbles: true,
      data: "",
      inputType: "deleteContentBackward"
    })
  );

  // Use clipboard-based paste (LinkedIn-safe)
  const clipboardData = new DataTransfer();
  clipboardData.setData("text/plain", message);

  box.dispatchEvent(
    new ClipboardEvent("paste", {
      clipboardData,
      bubbles: true
    })
  );

  return true;
}

// ================================
// Message Listener
// ================================

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "GENERATE") return;

  (async () => {
    try {
      const profileId = getProfileId();
      if (!profileId) {
        sendResponse({
          error: "Profile not detected. Open a LinkedIn profile page."
        });
        return;
      }

      chrome.runtime.sendMessage(
        { type: "CHECK_ALLOWED" },
        async (res) => {
          if (!res || !res.allowed) {
            sendResponse({
              error: res?.reason || "Daily limit reached."
            });
            return;
          }

          const name = getName();
          const company = getCompany();

          const finalMessage = buildMessage(
            msg.template,
            name,
            company
          );

          setTimeout(async () => {
            try {
              const success = await insertMessage(finalMessage);

              if (!success) {
                sendResponse({
                  error: "Open the LinkedIn message box first."
                });
                return;
              }

              chrome.runtime.sendMessage({
                type: "MARK_SENT",
                profileId
              });

              sendResponse({ success: true });
            } catch (err) {
              sendResponse({
                error: "Failed to insert message."
              });
            }
          }, (msg.delay || 0) * 1000);
        }
      );
    } catch (err) {
      sendResponse({
        error: "Unexpected error occurred."
      });
    }
  })();

  // 🔑 KEEP MESSAGE PORT OPEN FOR ASYNC RESPONSE
  return true;
});
let lastUrl = location.href;

new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    console.log("URL changed, reloading content script...");
    window.location.reload();
  }
}).observe(document, { subtree: true, childList: true });
