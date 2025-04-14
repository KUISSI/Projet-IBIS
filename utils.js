function fetchData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.statusText);
        }
        return response.json();
      });
  }

  
  function clearContainer(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";
  }

  function createMessage(message, className = "") {
    const p = document.createElement("p");
    p.innerText = message;
    if (className) p.className = className;
    return p;
  }

  function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
  