document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;

  requestAnimationFrame(function () {
    body.classList.add("page-loaded");
  });

  window.addEventListener("pageshow", function () {
    body.classList.remove("page-exit");
    body.classList.add("page-loaded");
  });

  var internalLinks = document.querySelectorAll('a[href$=".html"]');

  for (var i = 0; i < internalLinks.length; i++) {
    internalLinks[i].addEventListener("click", function (e) {
      if (this.target === "_blank") {
        return;
      }

      var href = this.getAttribute("href");
      if (!href) {
        return;
      }

      e.preventDefault();
      body.classList.remove("page-loaded");
      body.classList.add("page-exit");

      setTimeout(function () {
        window.location.href = href;
      }, 350);
    });
  }

  var allRevealItems = document.querySelectorAll(
    "#div1, #div2, #div3, #div4, #experience-container, .job-box",
  );

  for (var j = 0; j < allRevealItems.length; j++) {
    allRevealItems[j].classList.add("reveal");
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            entries[k].target.classList.add("visible");
          }
        }
      },
      { threshold: 0.15 },
    );

    for (var l = 0; l < allRevealItems.length; l++) {
      observer.observe(allRevealItems[l]);
    }
  } else {
    for (var m = 0; m < allRevealItems.length; m++) {
      allRevealItems[m].classList.add("visible");
    }
  }

  var jobs = document.querySelectorAll(".job-box");
  var extraMap = {
    Google:
      "Focused on backend optimization, cloud support, and internal tooling for performance improvement.",
    "Globe Telecom":
      "Handled network monitoring, infrastructure support, and service stability analysis.",
    "Department of Information and Communications Technology (DICT)":
      "Worked on government system support, digital service modernization, and cybersecurity awareness.",
  };

  for (var n = 0; n < jobs.length; n++) {
    jobs[n].setAttribute("tabindex", "0");
    jobs[n].setAttribute("aria-expanded", "false");

    var title = jobs[n].querySelector("h3");
    if (title && !jobs[n].querySelector(".job-extra")) {
      var extra = document.createElement("div");
      extra.className = "job-extra";

      var extraText = document.createElement("p");
      extraText.textContent =
        extraMap[title.textContent.trim()] ||
        "Additional details are available in this section.";

      extra.appendChild(extraText);
      jobs[n].appendChild(extra);
    }

    jobs[n].addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        return;
      }

      var isActive = this.classList.contains("active");

      for (var o = 0; o < jobs.length; o++) {
        jobs[o].classList.remove("active");
        jobs[o].setAttribute("aria-expanded", "false");
      }

      if (!isActive) {
        this.classList.add("active");
        this.setAttribute("aria-expanded", "true");
      }
    });

    jobs[n].addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  }

  var contacts = document.querySelectorAll("#div4 p");

  for (var p = 0; p < contacts.length; p++) {
    contacts[p].setAttribute("tabindex", "0");

    contacts[p].addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        return;
      }

      var link = this.querySelector("a");
      var textToCopy = "";

      if (link) {
        textToCopy = link.href;
      } else {
        textToCopy = this.innerText.trim();
      }

      navigator.clipboard.writeText(textToCopy).then(function () {
        showToast("Copied to clipboard");
      });
    });

    contacts[p].addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  }

  var actionButton = document.querySelector(".button");

  function updateActionButton() {
    if (!actionButton) {
      return;
    }

    var docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
    var viewHeight = window.innerHeight;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (docHeight <= viewHeight + 20) {
      actionButton.classList.add("show-button");
      return;
    }

    if (scrollTop + viewHeight >= docHeight - 160) {
      actionButton.classList.add("show-button");
    } else {
      actionButton.classList.remove("show-button");
    }
  }

  window.addEventListener("scroll", updateActionButton);
  window.addEventListener("resize", updateActionButton);
  updateActionButton();

  function showToast(message) {
    var toast = document.getElementById("toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 1200);
  }
});
