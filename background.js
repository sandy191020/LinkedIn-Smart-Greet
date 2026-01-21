const DEFAULTS = {
  enabled: true,
  dailyLimit: 5,
  delaySeconds: 10,
  sentToday: 0,
  totalSent: 0,
  lastReset: new Date().toDateString(),
  sentProfiles: []
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(DEFAULTS);
});

function resetIfNewDay(data) {
  const today = new Date().toDateString();
  if (data.lastReset !== today) {
    data.sentToday = 0;
    data.lastReset = today;
  }
  return data;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.storage.local.get(null, (data) => {
    data = resetIfNewDay({ ...DEFAULTS, ...data });

    if (msg.type === "CHECK_ALLOWED") {
      if (!data.enabled) {
        sendResponse({ allowed: false, reason: "Extension OFF" });
        return;
      }
      if (data.sentToday >= data.dailyLimit) {
        sendResponse({ allowed: false, reason: "Daily limit reached" });
        return;
      }
      sendResponse({ allowed: true });
    }

    if (msg.type === "MARK_SENT") {
      data.sentToday++;
      data.totalSent++;
      data.sentProfiles.push(msg.profileId);
      chrome.storage.local.set(data);
    }

    if (msg.type === "GET_ANALYTICS") {
      sendResponse({
        sentToday: data.sentToday,
        totalSent: data.totalSent,
        limit: data.dailyLimit
      });
    }

    if (msg.type === "TOGGLE") {
      data.enabled = msg.value;
      chrome.storage.local.set(data);
    }

    if (msg.type === "SETTINGS") {
      chrome.storage.local.set(msg.settings);
    }
  });

  return true;
});
